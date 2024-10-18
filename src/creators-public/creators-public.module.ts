import { Module } from '@nestjs/common';
import { CreatorsPublicService } from './creators-public.service';
import { CreatorsPublicController } from './creators-public.controller';
import { Creator } from '@/creators/entities/creator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorsModule } from '@/creators/creators.module';

@Module({
  imports: [TypeOrmModule.forFeature([Creator]), CreatorsModule],
  providers: [CreatorsPublicService],
  controllers: [CreatorsPublicController],
})
export class CreatorsPublicModule {}
