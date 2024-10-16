// users.controller.ts
import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Use this to automatically exclude fields like password
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieved all users.',
  })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retrieved user by ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async findOneById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOneById(id).catch((err) => {
      throw new HttpException(
        {
          message: err.message || 'Failed to retrieve user',
        },
        err.message === 'User not found'
          ? HttpStatus.NOT_FOUND
          : HttpStatus.BAD_REQUEST,
      );
    });
  }

  // @Delete(':id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'User deleted successfully.',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'User not found.',
  // })
  // async delete(@Param('id') id: number): Promise<void> {
  //   return await this.usersService.deleteUser(id).catch((err) => {
  //     throw new HttpException(
  //       {
  //         message: err.message || 'Failed to delete user',
  //       },
  //       err.message === 'User not found'
  //         ? HttpStatus.NOT_FOUND
  //         : HttpStatus.BAD_REQUEST,
  //     );
  //   });
  // }
}
