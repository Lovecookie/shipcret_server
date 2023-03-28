import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FGetRefreshUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { FUserDto } from 'src/contents/users/dto/user.dto';
import { FUserEntity } from 'src/database/entitys/users.entity';
import { FJwtRefreshPayload } from '../jwt/jwt.payload';

export class FGetJwtRefreshUserDto extends PickType(FUserDto, [
    'useruuid'
] as const) {
    @IsNotEmpty()
    refreshToken: string;

    static fromRefreshPayload(
        refreshPayload: FJwtRefreshPayload
    ): FGetJwtRefreshUserDto {
        const verifyUser = new FGetJwtRefreshUserDto();
        verifyUser.useruuid = refreshPayload.sub;
        verifyUser.refreshToken = refreshPayload.refreshToken;
        return verifyUser;
    }
}
