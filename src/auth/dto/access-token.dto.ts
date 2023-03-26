import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FAccessTokenDto {
    @ApiProperty({ example: 'fdlnflesijfseflnvk', description: 'Access token' })
    @IsNotEmpty()
    @IsString()
    access_token: string;
}
