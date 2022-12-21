module.exports = {
    apps: [
      {
        name: "app",
        script: "app.cjs",
        interpreter: "node",
        instances: 1,
        autorestart: true,
        env: {
          NODE_ENV: "development",
          PORT: 3001
        }
      },
      {
        name: "app",
        script: "gm.js",
        interpreter: "node",
        instances: 1,
        autorestart: true,
        env: {
          NODE_ENV: "development",
          PORT: 3002
        }
      }
    ]
  };
  