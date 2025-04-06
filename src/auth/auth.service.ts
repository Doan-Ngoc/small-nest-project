import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { authCredentialDto } from '../users/dto/authCredentials-dto';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '../jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(receivedPassword: string, hashedPassword: string) {
    return bcrypt.compare(receivedPassword, hashedPassword);
  }

  async logIn(authCredentialDto: authCredentialDto) {
    const { username, password } = authCredentialDto;
    const user = await this.usersService.getUserByUserName(username);
    const checkPassword = await this.comparePassword(password, user.password);
    if (!checkPassword) throw new BadRequestException('Password incorrect');

    return {
      accessToken: this.jwtService.sign(
        { id: user.id },
        this.configService.get<string>('JWT_SECRET_ACCESS') as string,
        {
          expiresIn: '1h',
        },
      ),
    };
  }
}
