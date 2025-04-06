import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../users/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';

@Module({
  imports: [
    JwtModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
