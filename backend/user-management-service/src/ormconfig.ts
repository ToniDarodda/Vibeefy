import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

dotenv.config();
const { TYPE, HOST, PORT, DB_USERNAME, PASSWORD, DATABASE } = process.env;
console.log(TYPE, HOST, PORT, DB_USERNAME, PASSWORD, DATABASE);
export const config: DataSourceOptions = {
  type: TYPE,
  host: HOST,
  port: PORT,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations/',
  },
  ssl: {
    rejectUnauthorized: false, // Utilisez cette option avec prudence
  },
} as DataSourceOptions;

export const dataSource = new DataSource(config);
