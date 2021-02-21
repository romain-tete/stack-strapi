const fs = require('fs');

const databaseUsernameSecret = fs.readFileSync("/run/secrets/strapi_database_username", { encoding: 'utf-8' });
const databasePasswordSecret = fs.readFileSync("/run/secrets/strapi_database_password", { encoding: 'utf-8' });

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        username: databaseUsernameSecret || 'strapi',
        password: databasePasswordSecret || 'strapi',
      },
      options: {
        useNullAsDefault: true,
        ssl: false
      },
    },
  },
});
