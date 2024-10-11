import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Creator } from './entities/creator.entity';
import { Repository } from 'typeorm';
import { User, UserRole } from '@/users/entities/user.entity';

@Injectable()
export class CreatorsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>,
  ) {}

  async create(createCreatorDto: CreateCreatorDto) {
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

    const userExisted: User = await this.userRepository.findOne({
      where: {
        role: UserRole.CREATOR,
        email,
      },
    });

    if (userExisted) {
      throw new Error('Email has been used');
    }
    // Hash the password (you might have a utility function for this)

    const slugExisted: Creator = await this.creatorRepository.findOne({
      where: {
        slug,
      },
    });

    if (slugExisted) {
      throw new Error('Slug has been used');
    }

    // Create the User entity
    const user = this.userRepository.create({
      email,
      password,
      role: UserRole.CREATOR, // Set the role as Creator (assuming you have an enum or string for this)
      isActive: true,
    });

    // Save the user to the database
    const savedUser = await this.userRepository.save(user);

    // Create the Creator entity with user_id linked to the created user
    const creator = this.creatorRepository.create({
      firstName,
      lastName,
      displayName,
      bio,
      slug,
      socialFacebook,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
      user: savedUser, // Link the user ID
    });

    // Save the creator to the database
    return this.creatorRepository.save(creator);
  }

  findAll() {
    return this.creatorRepository.find();
  }

  findOne(id: number) {
    return this.creatorRepository.findOneBy({ id });
  }

  async update(id: number, updateCreatorDto: UpdateCreatorDto) {
    const {
      firstName,
      lastName,
      displayName,
      bio,
      socialFacebook,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
    } = updateCreatorDto;

    const creator = await this.findOne(id);

    if (!creator) {
      throw new Error(`Creator member with ID ${id} not found`);
    }

    await this.creatorRepository.update(id, {
      firstName,
      lastName,
      displayName,
      bio,
      socialFacebook,
      socialInstagram,
      socialLinkedin,
      socialTwitter,
    });

    return this.findOne(id);
  }

  async delete(id: number) {
    return this.creatorRepository.softDelete(id);
  }
}
