import { Repository } from 'typeorm';
import { FFeedEntity } from '../entitys/feeds.entity';
import { FDatabaseConstants } from '../database.constants';
import { FFeedSummaryEntity } from '../entitys/feed-summary.entity';

export interface FFeedRepository extends Repository<FFeedEntity> {
    this: Repository<FFeedEntity>;

    findFeedsByUseruuid(
        useruuid: string,
        nextFeeduuid: string
    ): Promise<FFeedEntity[]>;
    findFeedSummarysByUseruuid(
        useruuid: string,
        nextFeeduuid: string
    ): Promise<FFeedSummaryEntity[]>;
    findFeedsByUseruuids(useruuids: string[]): Promise<FFeedEntity[]>;
    findHotFeeds(nextFeedUuid: string): Promise<FFeedEntity[]>;
    findTodayHotFeeds(nextFeedUuid: string): Promise<FFeedEntity[]>;
    findRandomFeeds(): Promise<FFeedEntity[]>;
}

export const _customFeedRepository: Pick<FFeedRepository, any> = {
    findFeedsByUseruuid: async function (
        useruuid: string,
        nextFeeduuid: string
    ): Promise<FFeedEntity[]> {
        return this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .andWhere('feeduuid < :nextFeeduuid', { nextFeeduuid })
            .orderBy('feeduuid', 'DESC')
            .take(FDatabaseConstants.FEED_NEXT_COUNT)
            .getMany();
    },
    findFeedSummarysByUseruuid(
        useruuid: string,
        nextFeeduuid: string
    ): Promise<FFeedSummaryEntity[]> {
        return this.createQueryBuilder()
            .select(['feeduuid', 'contentUrl', 'useruuid'])
            .where('useruuid = :useruuid', { useruuid })
            .andWhere('feeduuid < :nextFeeduuid', { nextFeeduuid })
            .orderBy('feeduuid', 'DESC')
            .take(FDatabaseConstants.FEED_NEXT_COUNT)
            .getMany();
    },
    findFeedsByUseruuids: async function (
        useruuids: string[]
    ): Promise<FFeedEntity[]> {
        return this.createQueryBuilder()
            .where('useruuid IN (:...useruuids)', { useruuids })
            .select()
            .getMany();
    },
    findHotFeeds: async function (
        nextFeedUuid: string
    ): Promise<FFeedEntity[]> {
        return this.createQueryBuilder().select().execute();
    },
    findTodayHotFeeds: async function (
        nextFeedUuid: string
    ): Promise<FFeedEntity[]> {
        return this.createQueryBuilder().select().execute();
    },
    findRandomeFeeds: async function (): Promise<FFeedEntity[]> {
        return this.createQueryBuilder()
            .select()
            .orderBy('RAND()')
            .limit(10)
            .getMany();
    }
};
