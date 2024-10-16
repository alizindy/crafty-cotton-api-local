import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { FeatureModule } from './feature.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), FeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
