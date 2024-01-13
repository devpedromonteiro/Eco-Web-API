import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { EnumRoles } from 'src/models';
import { DeepPartial, MongoRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<DeepPartial<User>> {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      role: EnumRoles.USER,
    };

    const createdUser = await this.usersRepository.save(user);

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
