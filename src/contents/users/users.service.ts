import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FUserEntity, EUserRole } from 'src/database/entitys/users.entity';
import * as bcrypt from 'bcrypt';
import { FResponseUserDto } from './dto/response-user.dto';
import { FUserRepository } from 'src/database/repositorys/user.repository';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FSignUpUserDto } from 'src/auth/dto/signUp-user.dto';
import { FSignInUserDto } from 'src/auth/dto/signIn-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject(FDatabaseConstants.USER_REPOSITORY)
        private readonly userRepository: FUserRepository
    ) {}

    async findAll(): Promise<FResponseUserDto[]> {
        return await this.userRepository.find();
    }

    async findOneByPayload(useruuid: string): Promise<FUserEntity> {
        const userEntity = await this.userRepository.findOneBy({ useruuid });
        if (!userEntity) {
            throw new UnauthorizedException('User not found!');
        }

        return userEntity;
    }

    async findOneByUuid(useruuid: string): Promise<FResponseUserDto> {
        const userEntity = await this.userRepository.findOneBy({ useruuid });
        if (!userEntity) {
            throw new UnauthorizedException('User not found!');
        }

        return FResponseUserDto.fromUser(userEntity);
    }

    async findOneByMail(email: string): Promise<FResponseUserDto> {
        const userEntity = await this.userRepository.findOneBy({ email });
        if (!userEntity) {
            throw new UnauthorizedException('User not found!');
        }

        return FResponseUserDto.fromUser(userEntity);
    }

    async create(signUpUserDto: FSignUpUserDto): Promise<FResponseUserDto> {
        const foundOne = await this._findOneByMail(signUpUserDto.email);
        if (foundOne) {
            throw new UnauthorizedException('User already exists!');
        }

        const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);

        const user = new FUserEntity();
        user.name = signUpUserDto.name;
        user.email = signUpUserDto.email;
        user.password = hashedPassword;
        user.role = EUserRole.NORMAL;
        return await this.userRepository.save(user);
    }

    async findOneByMailAndPassword(
        signInUserDto: FSignInUserDto
    ): Promise<FResponseUserDto> {
        const foundOne = await this._findOneByMail(signInUserDto.email);
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

    private async _findOneByMail(email: string): Promise<FUserEntity> {
        return await this.userRepository.findOneBy({ email });
    }
}
