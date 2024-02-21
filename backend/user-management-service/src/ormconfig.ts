import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

dotenv.config();

const { TYPE, HOST, PORT, USERNAME, PASSWORD, DATABASE } = process.env;

export const config: DataSourceOptions = {
  type: TYPE,
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations/',
  },
} as DataSourceOptions;

export const dataSource = new DataSource(config);
