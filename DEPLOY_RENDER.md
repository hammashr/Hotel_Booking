# Deploy Backend on Render (Monorepo)

## 1) Create Render Web Service

1. Go to Render Dashboard → **New** → **Web Service**.
2. Connect your GitHub repo and select this monorepo.
3. Configure service:
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

## 2) Add Environment Variables (Render)

In Render service settings → **Environment**, add:

- `MONGO_URI` = your MongoDB connection string
- `CORS_ORIGINS` = `https://tinyescape.vercel.app,http://localhost:5173`
- `EMAIL_HOST` = `smtp.office365.com`
- `EMAIL_PORT` = `587`
- `EMAIL_USER` = your sending mailbox
- `EMAIL_PASS` = your mailbox password or app password
- `EMAIL_TO` = destination inbox for contact messages

Note: Render injects `PORT` automatically.

## 3) Deploy

1. Click **Create Web Service** (or manual deploy if already created).
2. Wait for build + start logs to show service is live.

## 4) Test Health Endpoint

After deploy, open:

- `https://<your-render-service>.onrender.com/api/health`

Expected response:

```json
{ "status": "ok" }
```

## 5) Configure Frontend in Vercel

In Vercel project settings → **Environment Variables**, add:

- `VITE_API_BASE_URL` = `https://<your-render-service>.onrender.com/api`

If you want Vercel's own serverless `api/contact.js` fallback to work as well, also add these in Vercel:

- `EMAIL_HOST` = `smtp.office365.com`
- `EMAIL_PORT` = `587`
- `EMAIL_USER` = your sending mailbox
- `EMAIL_PASS` = your mailbox password or app password
- `EMAIL_TO` = destination inbox for contact messages

Redeploy Vercel after adding/updating this variable.
