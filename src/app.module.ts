import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { FeatureModule } from './feature.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { VariantOptionsController } from './variant-options/variant-options.controller';
import { VariantOptionsModule } from './variant-options/variant-options.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule should be global
    TypeOrmModule.forRoot(dataSourceOptions),
    FeatureModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
