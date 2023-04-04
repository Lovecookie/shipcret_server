import { PickType } from '@nestjs/swagger';
import { FUserDto } from 'src/contents/users/dto/user.dto';
import { FJwtToken } from '../jwt/jwt-tokens';
import { IsNotEmpty, IsObject } from 'class-validator';
import { FUserEntity } from 'src/database/entitys/users.entity';

export class FSignUserInfoDto extends PickType(FUserDto, [
    'name',
    'email'
] as const) {
    @IsNotEmpty()
    @IsObject()
    token: FJwtToken;

    static fromEntity(
        userEntity: FUserEntity,
        tokens: FJwtToken
    ): FSignUserInfoDto {
        return {
            name: userEntity.name,
            email: userEntity.email,
            token: tokens
        };
    }
}
