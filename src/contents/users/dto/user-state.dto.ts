import { ApiProperty } from '@nestjs/swagger';

export class FUserStateDto {
    @ApiProperty({ description: 'User uuid' })
    useruuid: string;

    @ApiProperty({ description: 'User state' })
    state: number;

    @ApiProperty({ description: 'last Activate Time' })
    lastActivateTime: Date;

    @ApiProperty({ description: 'my Friend Count' })
    myFriendCount: number;

    @ApiProperty({ description: 'my Best Frien Count' })
    myBestFriendCount: number;
}
