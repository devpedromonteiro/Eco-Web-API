import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from './user.entity';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUserstDto } from './dto/update-users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  @Get(':id')
  @ApiParam({name:"id"})
  async getUser(@Param('id') id): Promise<User> {
    const user =
      ObjectID.isValid(id) && (await this.usersRepository.findOne(id));
    if (!user) {
      // Entity not found
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUsersDto): Promise<User> {
    if (!user || !user.username || !user.password) {
      throw new BadRequestException(
        `A user must have at least username and password defined`,
      );
    }
    return await this.usersRepository.save(new User(user));
  }

  @Put(':id')
  @HttpCode(204)
  @ApiParam({name:"id"})
  async updateUser(
    @Param('id') id,
    @Body() user: UpdateUserstDto
  ): Promise<void> {
    // Check if entity exists
    const exists =
      ObjectID.isValid(id) && (await this.usersRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }

    await this.usersRepository.update(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiParam({name:"id"})
  async deleteUser(@Param('id') id): Promise<void> {
    // Check if entity exists
    const exists =
      ObjectID.isValid(id) && (await this.usersRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);
  }
}
