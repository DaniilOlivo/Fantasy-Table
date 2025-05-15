import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/role.enum';

export type JwtPayload = {
    sub: string;
    username: string;
    role: Role;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt_secret')!,
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
