require('dotenv/config');
console.log("ENV", process.env.DATABASE_URL)
module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    },
    dialect: 'postgres',
    timezone: '-03:00'
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    timezone: '-03:00',
    dialect: 'postgres',
    operatorsAliases: false
  }
}
