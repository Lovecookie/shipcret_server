import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FMyFeedDto {
    @ApiProperty({})
    @IsNotEmpty()
    nextFeeduuid: string;
}
