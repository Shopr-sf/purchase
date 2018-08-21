module.exports = {
  apps: [
    {
      name: 'purchase-service',
      script: './app.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
