import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Creator } from '../creators/entities/creator.entity';

@Injectable()
export class CreatorsPublicService {
  constructor(
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>,
  ) {}

  async findAll(): Promise<Creator[]> {
    return this.creatorRepository.find();
  }

  async findOne(id: number): Promise<Creator> {
    const creator = await this.creatorRepository.findOne({ where: { id } });
    if (!creator) {
      throw new Error(`Creator with ID ${id} not found`);
    }
    return creator;
  }
}
