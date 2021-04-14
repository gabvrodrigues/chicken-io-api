require('dotenv/config');
console.log("ENV", process.env.DATABASE_URL)
module.exports = {
  url: process.env.DATABASE_URL,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  dialect: 'postgres',
  timezone: '-03:00'
}
