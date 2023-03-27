import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FGetJwtRefreshUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { FUserDto } from 'src/contents/users/dto/user.dto';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FJwtRefreshPayload } from '../jwt/jwt.payload';

export class FJwtRefreshUserDto extends PickType(FUserDto, [
    'useruuid'
] as const) {
    @IsNotEmpty()
    refreshToken: string;

    static fromRefreshPayload(
        refreshPayload: FJwtRefreshPayload
    ): FJwtRefreshUserDto {
        const verifyUser = new FJwtRefreshUserDto();
        verifyUser.useruuid = refreshPayload.sub;
        verifyUser.refreshToken = refreshPayload.refreshToken;
        return verifyUser;
    }

    // static fromUser(userEntity: FUserEntity): FRefreshUserDto {
    //     const verifyUser = new FRefreshUserDto();
    //     verifyUser.useruuid = userEntity.useruuid;
    //     verifyUser.refreshToken = userEntity.refreshToken;
    //     return verifyUser;
    // }
}
