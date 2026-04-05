module.exports = {
  apps: [
    {
      name: "tiny-escape-api",
      script: "./src/server.js",
      cwd: "/var/www/thetinyescape/backend",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};
