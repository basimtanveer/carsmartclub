module.exports = {
    apps: [
      {
        name: 'carsmartclub',
  
        script: 'npm',
        args: 'run start',
        cwd: '/home/carsmart/carsmartclub',
  
        instances: 1,
        exec_mode: 'fork',
  
        env: {
          NODE_ENV: 'production',
          PORT: 3001,
  
          // URLs
          NEXT_PUBLIC_APP_URL: 'https://carsmartclub.com',
          NEXT_PUBLIC_SITE_URL: 'https://carsmartclub.com',
  
          // Secrets (VPS only)
          MONGODB_URI: '',
          JWT_SECRET: '',
        },
      },
    ],
  };
  