require('dotenv/config');

module.exports = {
  "development": {
    'dialect': 'postgres',
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    host: '127.0.0.1',
    timezone: '-03:00',
  },
  "production": {
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    },
    dialect: 'postgres',
    timezone: '-03:00',
  }

}