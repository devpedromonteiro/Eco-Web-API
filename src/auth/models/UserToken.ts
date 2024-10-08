import { User } from 'src/user/entities/user.entity';

export interface UserToken {
  access_token: string;
  auth_user: Partial<User>;
}
