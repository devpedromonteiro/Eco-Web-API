import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { EnumRoles } from 'src/models';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Post()
  @Roles(EnumRoles.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    const emailExists = await this.userService.findByEmail(createUserDto.email);

    if (emailExists) {
      throw new HttpException('E-mail já está em uso', HttpStatus.BAD_REQUEST);
    }

    return this.userService.create(createUserDto);
  }
}
