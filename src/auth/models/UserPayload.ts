import { EnumRoles } from 'src/models';

/**
 * UserPayload
 *
 * This is the user object that will be encoded into the JWT.
 */
export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  role: EnumRoles;
  iat?: number;
  exp?: number;
}
