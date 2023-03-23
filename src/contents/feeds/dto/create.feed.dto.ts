import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { FFeedDto } from './feed.dto';

export class FCreateFeedDto extends PickType(FFeedDto, [
    'title',
    'content'
] as const) {
    @ApiProperty({ example: 'john@mail.com', description: 'User Email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
