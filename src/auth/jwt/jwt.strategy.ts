import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(FDatabaseConstants.USER_REPOSITORY)
        private readonly userRepository: FUserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: FPayload): Promise<FUserEntity> {
        const userEntity = await this.userRepository.findOneById(payload.sub);
        if (userEntity) {
            return userEntity;
        } else {
            throw new UnauthorizedException('jwt is invalid!');
        }
    }
}
