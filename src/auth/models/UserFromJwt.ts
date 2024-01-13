import { EnumRoles } from 'src/models';

/**
 * UserFromJwt
 *
 * This is the user object that will be returned from the validate() method of the JwtStrategy class.
 */
export class UserFromJwt {
  id: string;
  email: string;
  name: string;
  role: EnumRoles;
}
