import {
    Body,
    Controller,
    Get,
    UnauthorizedException,
    UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UsersService } from 'src/users/users.service';
import { FCreateFeedDto } from './dto/create.feed.dto';
import { FResponseFeedDto } from './dto/response.feed.dto';
import { FeedsService } from './feeds.service';

@Controller('feeds')
@UseInterceptors(TransformInterceptor)
export class FeedsController {
    constructor(
        private readonly feedsService: FeedsService,
        private readonly userService: UsersService
    ) {}

    @ApiOperation({ summary: 'create feed' })
    @ApiResponse({})
    @Get('createFeed')
    async createFeed(
        @Body() createDto: FCreateFeedDto
    ): Promise<FResponseFeedDto> {
        const userEntity = await this.userService.findOneByMail(
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
    async hotFeeds() {
        return await this.feedsService.getHotFeeds();
    }

    @ApiResponse({
        status: 200,
        description: 'success',
        type: FResponseFeedDto
    })
    @ApiOperation({ summary: 'today hot feeds' })
    @Get('todayHotFeeds')
    async todayHotFeeds() {
        return await this.feedsService.getTodayHotFeeds();
    }
}
