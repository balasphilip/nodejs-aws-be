/* eslint-disable */
const YAML = require('yaml')
const fs = require('fs');
const { resolve } = require('path');
const { connection } = require('./src/db-connection-config.ts');

const serverless = YAML.parse(fs.readFileSync(resolve(__dirname, '.', 'serverless.yml'), 'utf8'));
const env = serverless.provider.environment;

const config = {
  ...connection,
  // for local usage of:  "npm run typeorm:revert" command, "npm run typeorm:generate"
  host: env.PG_HOST || 'postgres',
  database: env.PG_DATABASE || 'postgres',
  port: Number.parseInt(env.PG_PORT, 10) || 5432,
  username: env.PG_USERNAME,
  password: env.PG_PASSWORD,
};

module.exports = config;
