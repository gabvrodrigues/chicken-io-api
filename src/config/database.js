require('dotenv/config');

module.exports = {
  url: process.env.DATABASE_URL,
  dialectOptions: {
    "ssl": false
  },
  dialect: 'postgres',
  timezone: '-03:00'
}
