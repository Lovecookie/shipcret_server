import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FSearchFeedDto {
    @ApiProperty({ description: 'next search feed uuid' })
    @IsNotEmpty()
    nextFeedUuid: string;
}
