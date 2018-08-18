module.exports = {
  apps: [
    {
      name: 'purchase-service',
      script: './server/index.js',
      watch: ['server', 'client'],
      ignore_watch: ['node_modules', 'newrelic**'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
