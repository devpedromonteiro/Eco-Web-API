import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DeepPartial } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * login
   *
   * Login user
   *
   * @param user
   *
   * @returns Promise<UserToken>
   */
  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    delete user.password;

    return {
      access_token: this.jwtService.sign(payload),
      auth_user: user,
    };
  }

  /**
   * validateUser
   *
   * Validate user credentials
   *
   * @param email
   * @param password
   *
   * @returns Promise<DeepPartial<User>>
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<DeepPartial<User>> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
