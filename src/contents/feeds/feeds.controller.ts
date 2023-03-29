import {
    Body,
    Controller,
    Get,
    Post,
    UnauthorizedException,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { IsPublicAuth } from 'src/auth/jwt/jwt.public';
import { FGetUser } from 'src/common/decorators/jwt-token-verify-user.decorator';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { FCreateFeedDto } from './dto/create-feed.dto';
import { FResponseFeedDto } from './dto/response-feed.dto';
import { FSearchFeedDto } from './dto/search-feed.dto';
import { FeedsService } from './feeds.service';

@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
@Controller('feeds')
export class FeedsController {
    constructor(private readonly feedsService: FeedsService) {}

    @ApiOperation({ summary: 'create feed' })
    @ApiResponse({})
    @Post('create')
    async createFeed(
        @FGetUser() getUser,
        @Body() createDto: FCreateFeedDto
    ): Promise<FResponseFeedDto> {
        return await this.feedsService.createFeed(getUser, createDto);
    }

    @IsPublicAuth()
    @ApiOperation({ summary: 'hot feeds' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseFeedDto
    })
    @Get('hot')
    async hotFeeds(
        @Body() searchFeedDto: FSearchFeedDto
    ): Promise<FResponseFeedDto[]> {
        const feedEntity = await this.feedsService.getHotFeeds(searchFeedDto);
        if (feedEntity.length > 0) {
            return feedEntity.map((entity) =>
                FResponseFeedDto.fromFeedEntity(entity)
            );
        }

        return [];
    }

    @IsPublicAuth()
    @ApiOperation({ summary: 'today hot feeds' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseFeedDto
    })
    @Get('today-hot')
    async todayHotFeeds(
        @Body() searchFeedDto: FSearchFeedDto
    ): Promise<FResponseFeedDto[]> {
        const feedEntitys = await this.feedsService.getTodayHotFeeds(
            searchFeedDto
        );
        if (feedEntitys.length > 0) {
            return feedEntitys.map((entity) =>
                FResponseFeedDto.fromFeedEntity(entity)
            );
        }

        return [];
    }

    @IsPublicAuth()
    @ApiOperation({ summary: 'random feeds' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseFeedDto
    })
    @Get('random')
    async randomFeeds(
        @Body() searchFeedDto: FSearchFeedDto
    ): Promise<FResponseFeedDto[]> {
        const feedEntitys = await this.feedsService.getRandomFeeds(
            searchFeedDto
        );
        if (feedEntitys.length > 0) {
            return feedEntitys.map((entity) =>
                FResponseFeedDto.fromFeedEntity(entity)
            );
        }

        return [];
    }

    @ApiOperation({ summary: 'friends feeds' })
    @Get('friends')
    async friendsFeeds(@FGetUser() getUser): Promise<FResponseFeedDto[]> {
        const feedEntitys = await this.feedsService.getFriendsFeeds(getUser);
        if (feedEntitys.length > 0) {
            return feedEntitys.map((entity) =>
                FResponseFeedDto.fromFeedEntity(entity)
            );
        }

        return [];
    }
}
