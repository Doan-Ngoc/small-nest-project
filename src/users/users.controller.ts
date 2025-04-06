import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { authCredentialDto } from './dto/authCredentials-dto';
import { UserOwnershipGuard } from 'src/guards/UserOwnership.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('')
  deleteUser(@GetUser() user: User) {
    const id = user.id;
    return this.usersService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    const id = user.id;
    return this.usersService.updateUser(id, updateUserDto);
  }

  // @Get()
  // getAllUsers() {
  //   return this.usersService.getAllUsers();
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  // @UseGuards(AuthGuard)
  // @Delete()
  // deleteUser(@GetUser() user) {
  //   const id = user.id;
  //   return this.usersService.deleteUser(id);
  // }

  // @UseGuards(AuthGuard)
  // @Put()
  // update(@GetUser() user, @Body() updateUserDto: UpdateUserDto) {
  //   const id = user.id;
  //   return this.usersService.updateUser(id, updateUserDto);
  // }
}
