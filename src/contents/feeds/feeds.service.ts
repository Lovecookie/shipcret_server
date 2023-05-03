import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { FGetJwtUserDto } from 'src/auth/dto/get-jwt-user.dto';
import { FDatabaseConstants } from 'src/database/database.constants';
import { FFeedEntity } from 'src/database/entitys/feeds.entity';
import { FFeedRepository } from 'src/database/repositorys/feed.repository';
import { FriendsService } from '../friends/friends.service';
import { UsersService } from '../users/users.service';
import { FCreateFeedDto } from './dto/create-feed.dto';
import { FResponseFeedDto } from './dto/response-feed.dto';
import { FSearchFeedDto } from './dto/search-feed.dto';
import { FRequestNextFeedDto } from './dto/request-next-feed.dto';
import { FFeedSummaryEntity } from 'src/database/entitys/feed-summary.entity';

@Injectable()
export class FeedsService {
    constructor(
        @Inject(FDatabaseConstants.FEED_REPOSITORY)
        private readonly feedRepository: FFeedRepository,
        private readonly usersService: UsersService,
        private readonly friendsService: FriendsService
    ) {}

    async createFeed(
        getUser: FGetJwtUserDto,
        createDto: FCreateFeedDto
    ): Promise<FFeedEntity> {
        const userEntity = await this.usersService.findByUuid(getUser.useruuid);
        if (!userEntity) {
            throw new UnauthorizedException('invalid email');
        }

        const feedEntity = new FFeedEntity();
        feedEntity.title = createDto.title;
        feedEntity.content = createDto.content;
        feedEntity.useruuid = userEntity.useruuid;

        return await this.feedRepository.save(feedEntity);
    }

    async getMyFeed(
        getUser: FGetJwtUserDto,
        myfeedDto: FRequestNextFeedDto
    ): Promise<FFeedEntity[]> {
        const foundFeedEntitys = await this.feedRepository.findFeedsByUseruuid(
            getUser.useruuid,
            myfeedDto.nextFeeduuid
        );

        if (foundFeedEntitys.length <= 0) {
            return [];
        }

        return foundFeedEntitys;
    }

    async getFeedSummary(
        requestDto: FRequestNextFeedDto
    ): Promise<FFeedSummaryEntity[]> {
        const foundsummaryEntitys =
            await this.feedRepository.findFeedSummarysByUseruuid(
                requestDto.useruuid,
                requestDto.nextFeeduuid
            );
        if (foundsummaryEntitys.length <= 0) {
            return [];
        }

        return foundsummaryEntitys;
    }

    async getFriendsFeeds(getUser: FGetJwtUserDto): Promise<FFeedEntity[]> {
        const friendUuids = await this.friendsService.getFriendUuids(
            getUser.useruuid
        );

        const foundFeedEntitys = await this.feedRepository.findFeedsByUseruuids(
            friendUuids
        );
        if (foundFeedEntitys.length > 0) {
            return foundFeedEntitys;
        }

        return [];
    }

    async getHotFeeds(searchFeedDto: FSearchFeedDto): Promise<FFeedEntity[]> {
        const foundEntitys = await this.feedRepository.findHotFeeds(
            searchFeedDto.nextFeedUuid
        );
        if (foundEntitys.length > 0) {
            return foundEntitys;
        }

        return [];
    }

    async getTodayHotFeeds(
        searchFeedDto: FSearchFeedDto
    ): Promise<FFeedEntity[]> {
        const foundEntitys = await this.feedRepository.findTodayHotFeeds(
            searchFeedDto.nextFeedUuid
        );
        if (foundEntitys.length > 0) {
            return foundEntitys;
        }

        return [];
    }

    async getRandomFeeds(
        searchFeedDto: FSearchFeedDto
    ): Promise<FFeedEntity[]> {
        const foundEntitys = await this.feedRepository.findRandomFeeds();
        if (foundEntitys.length > 0) {
            return foundEntitys;
        }

        return [];
    }
}
