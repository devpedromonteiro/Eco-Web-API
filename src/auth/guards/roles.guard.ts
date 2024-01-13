import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';

/**
 * Roles Guard
 *
 * Determines whether the request is allowed to proceed.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Can Activate
   *
   * Determines whether the request is allowed to proceed.
   *
   * @param context - The execution context.
   *
   * @returns Whether the request is allowed to proceed.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
