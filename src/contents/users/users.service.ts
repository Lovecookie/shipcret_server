import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FUserEntity, EUserRole } from 'src/database/entitys/users.entity';
import * as bcrypt from 'bcrypt';
import { FResponseUserDto } from './dto/response-user.dto';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FSignUpUserDto } from 'src/auth/dto/signUp-user.dto';
import { FSignInUserDto } from 'src/auth/dto/signIn-user.dto';
import { FUserStateRepository } from 'src/database/repositorys/user-state.repository';
import { FUserStateEntity } from 'src/database/entitys/user-state.entity';
import { FUserProfileRepository } from 'src/database/repositorys/user-profile.repository';
import { FResponseUserProfileDto } from './dto/response-user-profile.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject(FDatabaseConstants.USER_REPOSITORY)
        private readonly userRepository: FUserRepository,
        @Inject(FDatabaseConstants.USER_STATE_REPOSITORY)
        private readonly userStateRepository: FUserStateRepository,
        @Inject(FDatabaseConstants.USER_PROFILE_REPOSITORY)
        private readonly userProfileRepository: FUserProfileRepository
    ) {}

    async createUserState(useruuid: string): Promise<FUserStateEntity> {
        const userStateEntity = new FUserStateEntity();
        userStateEntity.useruuid = useruuid;
        userStateEntity.state = 0;
        userStateEntity.lastActivateTime = new Date(Date.now());
        userStateEntity.myFriendCount = 0;
        userStateEntity.myBestFriendCount = 0;

        return await this.userStateRepository.save(userStateEntity);
    }

    async findByUuid(useruuid: string): Promise<FUserEntity> {
        const userEntity = await this.userRepository.findOneBy({ useruuid });
        if (!userEntity) {
            throw new UnauthorizedException('User not found!');
        }

        return userEntity;
    }

    async findByMail(email: string): Promise<FUserEntity> {
        const userEntity = await this.userRepository.findOneBy({ email });
        if (!userEntity) {
            throw new UnauthorizedException('User not found!');
        }

        return userEntity;
    }

    async findByMailAndPassword(
        signInUserDto: FSignInUserDto
    ): Promise<FUserEntity> {
        const foundOne = await this.findByMail(signInUserDto.email);
        if (!foundOne) {
            throw new UnauthorizedException('User not found!');
        }

        const isPasswordValid = await bcrypt.compare(
            signInUserDto.password,
            foundOne.password
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is invalid!');
        }

        return foundOne;
    }

    async getUserAndState(
        useruuid: string
    ): Promise<[FUserEntity, FUserStateEntity]> {
        const userEntity = await this.userRepository.findOneBy({ useruuid });
        if (!userEntity) {
            throw new UnauthorizedException('User not found!');
        }

        let userStateEntity = await this.userStateRepository.findOneBy({
            useruuid
        });

        if (!userStateEntity) {
            userStateEntity = await this.createUserState(useruuid);
        }

        return [userEntity, userStateEntity];
    }

    async getUserProfile(useruuid: string): Promise<FResponseUserProfileDto> {
        const [userEntity, userStateEntity] = await this.getUserAndState(
            useruuid
        );

        const userProfileEntity = await this.userProfileRepository.findOneBy({
            useruuid
        });
        if (!userProfileEntity) {
            throw new UnauthorizedException('User profile not found!');
        }

        return FResponseUserProfileDto.fromUserInfo(
            userEntity,
            userStateEntity,
            userProfileEntity
        );
    }
}
