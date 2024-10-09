import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  dropSchema: false,
  logging: ['query', 'error'],
  logger: 'file',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`dist/db/migrations/*.{ts,js}`],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
