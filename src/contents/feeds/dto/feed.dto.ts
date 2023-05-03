import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FFeedDto {
    @ApiProperty({
        description: 'Feed UUID',
        example: 'f8a8c0c0-8a8c-11ea-8c55-0242ac130003'
    })
    @IsNotEmpty()
    feeduuid: string;

    @ApiProperty({ description: 'Feed Title' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'Feed Content' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'Feed content url' })
    @IsString()
    contentUrl: string;

    @ApiProperty({ description: 'Feed view Count' })
    @IsNotEmpty()
    @IsNumber()
    viewCount: number;

    @ApiProperty({ description: 'Feed like Count' })
    @IsNotEmpty()
    @IsNumber()
    likeCount: number;

    @ApiProperty({ description: 'user UUID', example: 'user UUID' })
    @IsNotEmpty()
    useruuid: string;
}
