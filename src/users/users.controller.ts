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
  async getUser(@Param('id') id): Promise<User> {
    const user = ObjectID.isValid(id) && (await this.usersRepository.findOne(id));
    if (!user) {
      // Entity not found
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    if (!user || !user.username || !user.password) {
      throw new BadRequestException(
        `A user must have at least username and password defined`,
      );
    }
    return await this.usersRepository.save(new User(user));
  }

  @Put(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id, @Body() user: Partial<User>): Promise<void> {
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
