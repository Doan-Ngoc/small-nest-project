import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../users/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // imports: [
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       secret: configService.get<string>('JWT_SECRET_ACCESS'),
  //       signOptions: {
  //         expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION'),
  //       },
  //     }),
  //     inject: [ConfigService],
  //   }),
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       secret: configService.get<string>('JWT_SECRET_REFRESH'),
  //       signOptions: {
  //         expiresIn: configService.get<string>('JWT_REFRESH_EXPIRATION'), // Example: "7d"
  //       },
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  imports: [JwtModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
