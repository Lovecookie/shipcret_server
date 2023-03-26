import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FVerifyRefreshUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { FUserDto } from 'src/contents/users/dto/user.dto';
import { FUserEntity } from 'src/database/entitys/users.entity';

export class FRefreshUserDto extends PickType(FUserDto, ['useruuid'] as const) {
    @IsNotEmpty()
    refreshToken: string;

    static fromUser(userEntity: FUserEntity): FRefreshUserDto {
        const verifyUser = new FRefreshUserDto();
        verifyUser.useruuid = userEntity.useruuid;
        verifyUser.refreshToken = userEntity.refreshToken;
        return verifyUser;
    }
}
