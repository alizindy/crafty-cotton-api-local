import { Module } from '@nestjs/common';
import { CreatorsService } from './creators.service';
import { CreatorsController } from './creators.controller';
import { Creator } from './entities/creator.entity';
import { User } from '@/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Creator])],
  controllers: [CreatorsController],
  providers: [CreatorsService],
})
export class CreatorsModule {}
