import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUserWithTransaction(
    manager: EntityManager,
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, password } = createUserDto;

    const userExisted: User = await manager.findOne(User, {
      where: { email, role },
    });

    if (userExisted) {
      throw new Error('Email has been used');
    }

    const user = manager.create(User, {
      email,
      password,
      role,
      isActive: true,
    });

    // Save the user entity
    const savedUser = await manager.save(User, user);

    // Delete password before returning the saved user
    delete savedUser.password;
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  // async deleteUser(id: number): Promise<void> {
  //   const user = await this.findOneById(id); // This will throw NotFoundException if user doesn't exist
  //   await this.userRepository.softDelete(user.id);
  // }
}
