import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { authCredentialDto } from './dto/authCredentials-dto';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  private filePath = path.join(__dirname, '../../src/data/mockData.json');

  private readUsersFromFile(): any[] {
    const fileData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(fileData);
  }

  private writeUsersToFile(users: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  getAllUsers() {
    return this.readUsersFromFile();
  }

  createUser(createUserDto: CreateUserDto) {
    const users = this.readUsersFromFile();
    const { username, password } = createUserDto;
    if (this.getUserByUserName(username)) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = this.authService.hashPassword(password);
    const newUser: User = {
      id: uuid(),
      username,
      password: hashedPassword,
    };
    users.push(newUser);
    this.writeUsersToFile(users);
  }

  getUserById(id: string) {
    const users = this.readUsersFromFile();
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getUserByUserName(username: string) {
    const users = this.readUsersFromFile();
    const user = users.find((user) => user.username === username);
    return user;
  }

  deleteUser(id: string) {
    const users = this.readUsersFromFile();
    this.writeUsersToFile(users.filter((user) => user.id !== id));
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const users = this.readUsersFromFile();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.username) {
      users[userIndex].username = updateUserDto.username;
    }
    if (updateUserDto.password) {
      const hashedPassword = this.authService.hashPassword(
        updateUserDto.password,
      );
      users[userIndex].password = hashedPassword;
    }
    this.writeUsersToFile(users);

    return users[userIndex];
  }
}
