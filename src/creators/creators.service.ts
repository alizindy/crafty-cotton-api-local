import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, UpdateResult } from 'typeorm';
import { Creator } from './entities/creator.entity';
import { UserRole } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>,
    private readonly dataSource: DataSource, // Inject DataSource for transactions
    private readonly usersService: UsersService, // Inject UsersService to manage user creation
  ) {}

  async create(createCreatorDto: CreateCreatorDto) {
    return this.dataSource.transaction(async (manager) => {
      const {
        email,
        password,
        firstName,
        lastName,
        displayName,
        bio,
        slug,
        socialFacebook,
        socialInstagram,
        socialLinkedin,
        socialTwitter,
      } = createCreatorDto;

      // Create the user within the transaction using UsersService
      const userEntity = await this.usersService.createUserWithTransaction(
        manager,
        {
          email,
          password,
        },
        UserRole.CREATOR,
      );

      // Check if slug is unique within the transaction
      const slugExisted = await manager.findOne(Creator, {
        where: { slug },
      });
      if (slugExisted) {
        throw new Error('Slug has been used');
      }

      // Create the Creator entity linked to the created user
      const creator = manager.create(Creator, {
        firstName,
        lastName,
        displayName,
        bio,
        slug,
        socialFacebook,
        socialInstagram,
        socialLinkedin,
        socialTwitter,
        user: userEntity, // Link the user
      });

      // Save the creator within the same transaction
      return manager.save(Creator, creator);
    });
  }

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

  async update(
    id: number,
    updateCreatorDto: UpdateCreatorDto,
  ): Promise<Creator> {
    const creator = await this.findOne(id);

    Object.assign(creator, updateCreatorDto);

    return this.creatorRepository.save(creator);
  }

  async delete(id: number): Promise<UpdateResult> {
    return this.creatorRepository.softDelete(id);
  }
}
