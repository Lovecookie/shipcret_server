import {
    Body,
    Controller,
    Get,
    Post,
    UnauthorizedException,
    UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UsersService } from 'src/users/users.service';
import { FCreateFeedDto } from './dto/create.feed.dto';
import { FResponseFeedDto } from './dto/response.feed.dto';
import { FSearchFeedDto } from './dto/search.feed.dto';
import { FeedsService } from './feeds.service';

@Controller('feeds')
@UseInterceptors(TransformInterceptor)
export class FeedsController {
    constructor(
        private readonly feedsService: FeedsService,
        private readonly usersService: UsersService
    ) {}

    @ApiOperation({ summary: 'create feed' })
    @ApiResponse({})
    @Post('create')
    async create(@Body() createDto: FCreateFeedDto): Promise<FResponseFeedDto> {
        const userEntity = await this.usersService.findOneByMail(
            createDto.email
        );
        if (!userEntity) {
            throw new UnauthorizedException('invalid email');
        }

        return await this.feedsService.createFeed(
            userEntity.useruuid,
            createDto
        );
    }

    @ApiOperation({ summary: 'hot feeds' })
    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseFeedDto
    })
    @Get('hotFeeds')
    async hotFeeds(@Body() searchFeedDto: FSearchFeedDto) {
        return await this.feedsService.getHotFeeds(searchFeedDto);
    }

    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseFeedDto
    })
    @ApiOperation({ summary: 'today hot feeds' })
    @Get('todayHotFeeds')
    async todayHotFeeds(@Body() searchFeedDto: FSearchFeedDto) {
        return await this.feedsService.getTodayHotFeeds(searchFeedDto);
    }

    @ApiOperation({ summary: 'new feeds' })
    @Get('friendsFeeds')
    async friendsFeeds() {
        return await this.feedsService.getFriendsFeeds();
    }
}
