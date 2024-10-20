import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserFactory } from './factories/user.factory';
import { LoginDto } from './dto/auth-login.dto';
import { UsersService } from '@/users/users.service';
import { UserRole } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: any, role: UserRole): Promise<any> {
    return this.userFactory.createUserByRole(dto, role);
  }

  // Step 1: Validate email only
  async validateEmail(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email not found');
    }
    return true;
  }

  // Step 2: Validate password and generate tokens
  async validatePasswordAndLogin(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);

    // Validate password
    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      const newAccessToken = await this.jwtService.signAsync(
        { email: payload.email, sub: payload.sub, role: payload.role },
        { expiresIn: '1h' },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
