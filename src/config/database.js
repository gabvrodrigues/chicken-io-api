require('dotenv/config');

module.exports = {
  url: process.env.DATABASE_URL,
  dialectOptions: {
    "ssl": true
  },
  dialect: 'postgres',
  timezone: '-03:00'
}
