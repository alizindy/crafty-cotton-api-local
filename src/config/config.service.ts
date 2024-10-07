import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: `postgres://${this.getValue('POSTGRES_USER')}:${this.getValue(
        'POSTGRES_PASSWORD',
      )}@${this.getValue('POSTGRES_HOST')}:${this.getValue(
        'POSTGRES_PORT',
      )}/${this.getValue('POSTGRES_DATABASE')}`,
      ssl:
        this.getValue('NODE_ENV') === 'develop'
          ? false
          : {
              rejectUnauthorized: false,
            },
      entities: [`${__dirname}/../**/*.entity.{ts,js}`],
      migrationsTableName: 'migration',
      migrations: [
        this.getValue('NODE_ENV') === 'develop'
          ? `src/migration/*.{ts,js}`
          : `dist/migration/*.{ts,js}`,
      ],
    };
  }

  // You can create a method to get CLI configuration if needed
  public getCliConfig() {
    return {
      migrationsDir:
        this.getValue('NODE_ENV') === 'develop'
          ? `src/migration`
          : `dist/migration`,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
