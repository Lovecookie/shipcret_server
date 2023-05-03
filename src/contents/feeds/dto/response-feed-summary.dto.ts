import { PickType } from '@nestjs/swagger';
import { FFeedEntity } from 'src/database/entitys/feeds.entity';
import { FFeedDto } from './feed.dto';
import { FFeedSummaryEntity } from 'src/database/entitys/feed-summary.entity';

export class FResponseFeedSummaryDto extends PickType(FFeedDto, [
    'feeduuid',
    'contentUrl',
    'useruuid'
] as const) {
    static fromFeedEntity(feedEntity: FFeedEntity): FResponseFeedSummaryDto {
        return {
            ...feedEntity
        };
    }

    static fromFeedSummaryEntity(
        feedSummaryEntity: FFeedSummaryEntity
    ): FResponseFeedSummaryDto {
        return {
            ...feedSummaryEntity
        };
    }
}
