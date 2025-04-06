import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { authCredentialDto } from '../users/dto/authCredentials-dto';
import { ConfigService } from '@nestjs/config';
import jwt, { SignOptions } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  logIn(@Body() authCredentialDto: authCredentialDto) {
    return this.authService.logIn(authCredentialDto);
  }

  // sign(payload: object, options?: SignOptions) {
  //   return jwt.sign(payload, this.configService.get<string>('JWT_SECRET_ACCESS') as string, options);
  // }

  // public async verify(token: string) {
  //   return jwt.verify(token, this.configService.get<string>('JWT_SECRET_ACCESS') as string, this.configService.get<string>('JWT_ACCESS_EXPIRATION'));
  // }
}
