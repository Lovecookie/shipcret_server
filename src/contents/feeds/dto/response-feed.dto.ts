import { PickType } from '@nestjs/swagger';
import { FFeedEntity } from 'src/database/entitys/feeds.entity';
import { FFeedDto } from './feed.dto';

export class FResponseFeedDto extends PickType(FFeedDto, [
    'feeduuid',
    'title',
    'viewCount',
    'likeCount',
    'useruuid'
] as const) {
    static fromFeedEntity(feedEntity: FFeedEntity): FResponseFeedDto {
        return {
            feeduuid: feedEntity.feeduuid,
            title: feedEntity.title,
            viewCount: feedEntity.viewCount,
            likeCount: feedEntity.likeCount,
            useruuid: feedEntity.useruuid
        };
    }
}
