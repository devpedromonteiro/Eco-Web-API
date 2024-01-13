import { SetMetadata } from '@nestjs/common';

// The string that identifies the metadata.
export const ROLES_KEY = 'roles';

/**
 * Roles
 *
 * Decorator that sets the metadata for the roles that are allowed to access the resource.
 *
 * @param roles - The roles that are allowed to access the resource.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
