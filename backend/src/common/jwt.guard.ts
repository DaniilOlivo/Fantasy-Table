import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC } from './public.decorator';
import { RoleKey } from './admin.decorator';
import { Role } from './role.enum';
import { JwtPayload } from 'src/auth/passport/jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const contextList = [context.getHandler(), context.getClass()];
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC,
            contextList,
        );
        const roleRequired = this.reflector.getAllAndOverride<Role>(
            RoleKey,
            contextList,
        );

        if (isPublic) return true;

        const isAuthorized = await super.canActivate(context);

        if (!isAuthorized) return false;

        if (roleRequired) {
            const req = context.switchToHttp().getRequest();
            const user = req.user as JwtPayload;
            if (user.role !== roleRequired)
                throw new ForbiddenException(
                    'The current user role does not have sufficient rights',
                );
        }

        return true;
    }
}
