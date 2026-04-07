# Deploy Tiny Escape on Hostinger VPS

This guide assumes:

- Ubuntu 24.04 on Hostinger VPS
- frontend and backend are deployed on the same VPS
- Nginx serves the built frontend and proxies `/api` to the Express backend
- MongoDB is hosted externally, for example MongoDB Atlas

## 1) Connect to the server

```bash
ssh root@YOUR_VPS_IP
```

## 2) Install system packages

```bash
apt update
apt install -y nginx curl git ufw
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
```

## 3) Prepare the app directory

```bash
mkdir -p /var/www/thetinyescape
cd /var/www/thetinyescape
git clone https://github.com/hammashr/Hotel_Booking .
```

If the repository is already on the server:

```bash
cd /var/www/thetinyescape
git pull origin main
```

## 4) Build the frontend

The frontend can use same-origin `/api`, so no `VITE_API_BASE_URL` is required when Nginx proxies `/api` locally.

```bash
cd /var/www/thetinyescape
npm install
npm run build
```

The built site will be written to `/var/www/thetinyescape/dist`.

## 5) Configure backend environment

```bash
cd /var/www/thetinyescape/backend
cp .env.example .env
nano .env
```

Recommended `.env` values:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
CORS_ORIGINS=https://thetinyescape.com,https://www.thetinyescape.com,http://localhost:5173,http://localhost:3000
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=hello@thetinyescape.com
EMAIL_PASS=YOUR_MAILBOX_PASSWORD
EMAIL_TO=hello@thetinyescape.com
```

## 6) Install backend dependencies and start with PM2

```bash
cd /var/www/thetinyescape/backend
npm install
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

After `pm2 startup` prints a command, run that command exactly once.

Useful PM2 commands:

```bash
pm2 status
pm2 logs tiny-escape-api
pm2 restart tiny-escape-api
```

## 7) Configure Nginx

Copy the provided config into Nginx:

```bash
cp /var/www/thetinyescape/deploy/nginx/thetinyescape.conf /etc/nginx/sites-available/thetinyescape
ln -s /etc/nginx/sites-available/thetinyescape /etc/nginx/sites-enabled/thetinyescape
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## 8) Allow HTTP and HTTPS through the firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## 9) Enable HTTPS

After DNS points to the VPS IP, install SSL:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d thetinyescape.com -d www.thetinyescape.com
```

## 10) Test the deployment

Frontend:

```bash
curl -I https://thetinyescape.com
```

Backend health route through Nginx:

```bash
curl https://thetinyescape.com/api/health
```

Expected backend response:

```json
{ "status": "ok" }
```

## 11) DNS requirement

If you are moving fully to Hostinger VPS, point these records to your VPS public IP instead of Vercel:

- `A` record for `@` -> `YOUR_VPS_IP`
- `A` record for `www` -> `YOUR_VPS_IP`

If Cloudflare is in front of the VPS, start with `DNS only` while validating Nginx and SSL.

## 12) Updates after first deployment

```bash
cd /var/www/thetinyescape
git pull origin main
npm install
npm run build
cd backend
npm install
pm2 restart tiny-escape-api
systemctl reload nginx
```

## Troubleshooting

Health endpoint returns frontend HTML:

- Nginx `/api/` proxy is missing or incorrect.

Browser shows `Live availability API is unavailable`:

- backend process is down, or
- `/api/houses` is not proxied to Express, or
- MongoDB connection failed during backend startup.

Check these commands:

```bash
pm2 logs tiny-escape-api
curl http://127.0.0.1:5000/api/health
curl https://thetinyescape.com/api/health
```
