import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const RoleKey = 'role';
export const Admin = () => SetMetadata('role', Role.Admin);
