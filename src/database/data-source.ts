import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'file',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [
    process.env.NODE_ENV === 'develop'
      ? `src/migrations/*.{ts,js}`
      : `dist/migrations/*.{ts,js}`,
  ],
  migrationsTableName: 'migration',
  ssl:
    process.env.NODE_ENV === 'develop' ? false : { rejectUnauthorized: false },
});
