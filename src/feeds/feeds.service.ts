import { Inject, Injectable, Post, UseGuards } from '@nestjs/common';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FFeedEntity } from 'src/database/entitys/feeds.entity';
import { FFeedRepository } from 'src/database/repositorys/feed.repository';
import { FCreateFeedDto } from './dto/create.feed.dto';
import { FResponseFeedDto } from './dto/response.feed.dto';
import { FSearchFeedDto } from './dto/search.feed.dto';

@Injectable()
export class FeedsService {
    constructor(
        @Inject(FDatabaseConstants.FEED_REPOSITORY)
        private readonly feedRepository: FFeedRepository
    ) {}

    /**
     *
     * 임시로 작업.. 나중에 jwt 인증 후 useruuid를 받아서 저장하도록 수정
     */
    async createFeed(
        useruuid: string,
        createDto: FCreateFeedDto
    ): Promise<FResponseFeedDto> {
        const feedEntity = new FFeedEntity();
        feedEntity.title = createDto.title;
        feedEntity.content = createDto.content;
        feedEntity.useruuid = useruuid;

        const saveEntity = await this.feedRepository.save(feedEntity);

        return FResponseFeedDto.fromFeedEntity(saveEntity);
    }

    async getFriendsFeeds(useruuid: string) {}

    async getHotFeeds(
        searchFeedDto: FSearchFeedDto
    ): Promise<FResponseFeedDto[]> {
        const foundEntitys = await this.feedRepository.findHotFeeds(
            searchFeedDto.nextFeedUuid
        );
        if (foundEntitys.length > 0) {
            return foundEntitys.map((entity) =>
                FResponseFeedDto.fromFeedEntity(entity)
            );
        }

        return [];
    }

    async getTodayHotFeeds(
        searchFeedDto: FSearchFeedDto
    ): Promise<FResponseFeedDto[]> {
        const foundEntitys = await this.feedRepository.findTodayHotFeeds(
            searchFeedDto.nextFeedUuid
        );
        if (foundEntitys.length > 0) {
            return foundEntitys.map((entity) =>
                FResponseFeedDto.fromFeedEntity(entity)
            );
        }

        return [];
    }
}
