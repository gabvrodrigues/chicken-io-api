require('dotenv/config');

module.exports = {
  url: process.env.DATABASE_URL,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  // host: process.env.DB_HOST,
  dialect: 'postgres',
  timezone: '-03:00'
}
