import { ApiProperty } from '@nestjs/swagger';

export class FUserProfileDto {
    followerCount: string;
    feedCount: string;
    secretCount: string;
    showingSecretCount: string;
}
