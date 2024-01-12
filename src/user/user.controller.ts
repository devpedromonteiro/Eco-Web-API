import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const emailExists = await this.userService.findByEmail(createUserDto.email);

    if (emailExists) {
      throw new HttpException('E-mail já está em uso', HttpStatus.BAD_REQUEST);
    }

    return this.userService.create(createUserDto);
  }
}
