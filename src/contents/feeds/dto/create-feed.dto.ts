import { ApiProperty, PickType } from '@nestjs/swagger';
import { FFeedDto } from './feed.dto';

export class FCreateFeedDto extends PickType(FFeedDto, [
    'title',
    'content'
] as const) {
    contentUrl: string;
}
