import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, UpdateResult } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

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

    const hashedPassword = await this.hashPassword(password);

    const user = manager.create(User, {
      email,
      password: hashedPassword,
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

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async deleteUser(id: number): Promise<UpdateResult> {
    return await this.userRepository.softDelete(id);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Define the salt rounds in a config if needed
  }

  async validatePassword(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
}
