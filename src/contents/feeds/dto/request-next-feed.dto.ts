import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FRequestNextFeedDto {
    @IsNotEmpty()
    useruuid: string;

    @IsNotEmpty()
    nextFeeduuid: string;
}
