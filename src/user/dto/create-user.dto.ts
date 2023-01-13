import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends User {
  @ApiProperty({description:'Username utilizado para o login'})
  @IsEmail()
  email: string;

  @ApiProperty({description:'Senha utilizada para o login'})
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({description:'Nome do usuário'})
  @IsString()
  name: string;
}
