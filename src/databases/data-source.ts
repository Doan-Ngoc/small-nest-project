import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, `../configs/.env`),
});

const dataSourceOptions: any = {
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [path.join(__dirname, '../**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '../databases/migrations/**/*.{ts,js}')],
  migrationsTableName: 'migrations',
};

export const AppDataSource = new DataSource(dataSourceOptions);

export default dataSourceOptions;
