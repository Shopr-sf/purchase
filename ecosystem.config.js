module.exports = {
  apps: [
    {
      name: 'purchase-service',
      script: './server/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
