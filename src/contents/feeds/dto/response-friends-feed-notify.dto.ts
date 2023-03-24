import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class FResponseFriendsFeedNotifyDto {
    @ApiProperty({ description: 'user uuid' })
    @IsNotEmpty()
    useruuid: string;

    @ApiProperty({ description: 'feed uuid' })
    @IsNotEmpty()
    feeduuid: string;

    @ApiProperty({ description: 'feed title' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'feed is bookmarked' })
    @IsNotEmpty()
    isBookmarked: boolean;
}
