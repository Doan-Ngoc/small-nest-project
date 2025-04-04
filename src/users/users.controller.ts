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
import { User } from './user.model';
import { UserOwnershipGuard } from 'src/guards/UserOwnership.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@GetUser() user) {
    const id = user.id;
    return this.usersService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@GetUser() user, @Body() updateUserDto: UpdateUserDto) {
    const id = user.id;
    return this.usersService.updateUser(id, updateUserDto);
  }

  // @Post('login')
  // logIn(@Body() authCredentialDto: authCredentialDto) {
  //   return this.usersService.logIn(authCredentialDto);
  // }
}
