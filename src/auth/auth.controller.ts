import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateStaffDto } from '@/staffs/dto/create-staff.dto';
import { CreateCustomerDto } from '@/customers/dto/create-customer.dto';
import { CreateCreatorDto } from '@/creators/dto/create-creator.dto';
import { LoginDto } from './dto/auth-login.dto';
import { ValidateEmailDto } from './dto/validate-email.dto'; // Import ValidateEmailDto
import { UserRole } from '@/users/entities/user.entity';
import { Customer } from '@/customers/entities/customer.entity';
import { Creator } from '@/creators/entities/creator.entity';
import { Staff } from '@/staffs/entities/staff.entity';
import { Public } from '@/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('validate-email')
  @ApiOperation({ summary: 'Validate user email before login' })
  @ApiBody({ type: ValidateEmailDto })
  @ApiResponse({ status: 200, description: 'Email is valid' })
  @ApiResponse({ status: 404, description: 'Email not found' })
  async validateEmail(
    @Body() validateEmailDto: ValidateEmailDto,
  ): Promise<{ message: string }> {
    try {
      await this.authService.validateEmail(validateEmailDto.email);
      return { message: 'Email is valid' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Email validation failed',
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Public()
  @Post('register/customer')
  @ApiOperation({ summary: 'Register a new customer' })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({ status: 201, description: 'Customer successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async registerCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    try {
      return await this.authService.register(
        createCustomerDto,
        UserRole.CUSTOMER,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Post('register/creator')
  @ApiOperation({ summary: 'Register a new creator' })
  @ApiBody({ type: CreateCreatorDto })
  @ApiResponse({ status: 201, description: 'Creator successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async registerCreator(
    @Body() createCreatorDto: CreateCreatorDto,
  ): Promise<Creator> {
    try {
      return await this.authService.register(
        createCreatorDto,
        UserRole.CREATOR,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Post('register/staff')
  @ApiOperation({ summary: 'Register a new staff member' })
  @ApiBody({ type: CreateStaffDto })
  @ApiResponse({ status: 201, description: 'Staff successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid request parameters' })
  async registerStaff(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
    try {
      return await this.authService.register(createStaffDto, UserRole.STAFF);
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Incorrect password' })
  async validatePasswordAndLogin(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      return await this.authService.validatePasswordAndLogin(loginDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, description: 'Returns a new access token' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshAccessToken(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string }> {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
