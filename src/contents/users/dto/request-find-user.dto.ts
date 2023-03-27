import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FRequestFindUserDto {
    @ApiProperty({ description: 'user uuid' })
    @IsNotEmpty()
    useruuid: string;
}
