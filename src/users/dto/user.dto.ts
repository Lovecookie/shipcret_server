import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FUserDto {
    @ApiProperty({ example: '1', description: 'User uuid' })
    @IsNotEmpty()
    useruuid: string;

    @ApiProperty({ example: 'John', description: 'User name', required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'john@mail.com',
        description: 'User email',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'User password',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
