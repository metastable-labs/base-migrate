module.exports = {
    apps: [
      {
        name: 'base-migrate-backend',
        script: 'yarn',
        args: 'start:prod',
        watch: false,
        merge_logs: true,
        cwd: '/var/www/base-migrate/backend-service',
      },
    ],
  };
  