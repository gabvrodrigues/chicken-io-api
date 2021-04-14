require('dotenv/config');
console.log("ENV", process.env.DATABASE_URL)
module.exports = {
  "production": {
    "use_env_variable": "DATABASE_URL",
    timezone: '-03:00',
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "development": {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    },
    dialect: 'postgres',
    timezone: '-03:00'
  }

}
