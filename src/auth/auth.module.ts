import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  // imports: [
  //   ConfigModule.forRoot(),
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.register({
  //     secret: 'yourSecretKey',
  //     signOptions: { expiresIn: '1h' },
  //   }),
  // ],
  // imports: [
  //   ConfigModule.forRoot(),
  //   PassportModule.register({ defaultStrategy: 'jwt' }),
  //   JwtModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       secret: configService.get<string>('JWT_SECRET_KEY'),
  //       signOptions: {
  //         expiresIn: configService.get<string>('JWT_EXPIRATION'),
  //       },
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  imports: [forwardRef(() => UsersModule), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
