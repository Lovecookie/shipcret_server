import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/contents/users/users.service';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FJwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: FJwtPayload): Promise<FUserEntity> {
        try {
            const userEntity = await this.usersService.findOneByPayload(
                payload.aud
            );

            if (userEntity) {
                return userEntity;
            } else {
                throw new UnauthorizedException('not found user');
            }
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
}
