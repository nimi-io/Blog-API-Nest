export default () => ({
  port: parseInt(process.env.PORT, 10) || 3004,
  database: {
    port: parseInt(process.env.DB_PORT, 10) || 5000,
    name: process.env.DB_NAME || 'fintech_test',
    username: process.env.DB_USERNAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    type: 'postgres',
    password: process.env.DB_PASSWORD || 'root',
  },
});
