import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FRequestDeleteFriendDto {
    @ApiProperty({ description: ' friend useruuid' })
    @IsString()
    @IsNotEmpty()
    frienduuid: string;
}
