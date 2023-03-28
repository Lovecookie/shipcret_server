import { Repository } from 'typeorm';
import { FFeedEntity } from '../entitys/feeds.entity';

export interface FFeedRepository extends Repository<FFeedEntity> {
    this: Repository<FFeedEntity>;

    findFeedsByUseruuid(useruuid: string): Promise<FFeedEntity[]>;
    findFeedsByUseruuids(useruuids: string[]): Promise<FFeedEntity[]>;
    findHotFeeds(nextFeedUuid: string): Promise<FFeedEntity[]>;
    findTodayHotFeeds(nextFeedUuid: string): Promise<FFeedEntity[]>;
}

export const _customFeedRepository: Pick<FFeedRepository, any> = {
    findFeedsByUseruuid: async function (
        useruuid: string
    ): Promise<FFeedEntity[]> {
        return this.createQueryBuilder()
            .where('useruuid = :useruuid', { useruuid })
            .select()
            .execute();
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
    }
};
