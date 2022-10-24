import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';
import { CreateUsersDto } from './create-users.dto';

export class UpdateUserstDto extends PartialType(CreateUsersDto) {}
