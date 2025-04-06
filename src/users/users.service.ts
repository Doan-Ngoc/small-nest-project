import {
  Injectable,
  NotFoundException,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { authCredentialDto } from './dto/authCredentials-dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByUserName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;
    const hashedPassword = this.authService.hashPassword(password);
    return this.userRepository.createUser({
      username,
      password: hashedPassword,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.getUserById(id);
    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }
    if (updateUserDto.password) {
      const hashedPassword = this.authService.hashPassword(
        updateUserDto.password,
      );
      user.password = hashedPassword;
    }
    await this.userRepository.save(user);
    return user;
  }

  // getAllUsers() {
  //   return this.readUsersFromFile();
  // }

  // createUser(createUserDto: CreateUserDto) {
  //   const users = this.readUsersFromFile();
  //   const { username, password } = createUserDto;
  //   if (this.getUserByUserName(username)) {
  //     throw new ConflictException('Username already exists');
  //   }
  //   const hashedPassword = this.authService.hashPassword(password);
  //   const newUser: User = {
  //     id: uuid(),
  //     username,
  //     password: hashedPassword,
  //   };
  //   users.push(newUser);
  //   this.writeUsersToFile(users);
  // }

  // deleteUser(id: string) {
  //   const users = this.readUsersFromFile();
  //   this.writeUsersToFile(users.filter((user) => user.id !== id));
  // }

  // updateUser(id: string, updateUserDto: UpdateUserDto) {
  //   const users = this.readUsersFromFile();
  //   const userIndex = users.findIndex((u) => u.id === id);
  //   if (userIndex === -1) {
  //     throw new NotFoundException('User not found');
  //   }
  //   if (updateUserDto.username) {
  //     users[userIndex].username = updateUserDto.username;
  //   }
  //   if (updateUserDto.password) {
  //     const hashedPassword = this.authService.hashPassword(
  //       updateUserDto.password,
  //     );
  //     users[userIndex].password = hashedPassword;
  //   }
  //   this.writeUsersToFile(users);

  //   return users[userIndex];
  // }
}
