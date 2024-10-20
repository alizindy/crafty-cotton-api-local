// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserFactory } from './factories/user.factory';
import { CustomersModule } from '@/customers/customers.module';
import { StaffsModule } from '@/staffs/staffs.module';
import { CreatorsModule } from '@/creators/creators.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    StaffsModule,
    CreatorsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET, // Securely access JWT_SECRET from environment variables
        // signOptions: { expiresIn: '1h' }, // Token expiration time
      }),
      inject: [ConfigService], // Inject ConfigService to handle the config logic
    }),
  ],
  providers: [AuthService, JwtStrategy, UserFactory],
  controllers: [AuthController],
})
export class AuthModule {}
