import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FCommonConstants } from 'src/common/common.constants';
import { UsersService } from 'src/contents/users/users.service';
import { Request } from 'express';
import { FJwtPayload } from './jwt.payload';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    FCommonConstants.JWT_TOKEN_REFRESH
) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    async validate(request: Request, payload: FJwtPayload) {
        const refreshToken = request.headers?.authorization?.split(' ')[1];

        if (!refreshToken) {
            throw new UnauthorizedException('not found refresh token');
        }

        return {
            ...payload,
            refreshToken
        };
    }
}
