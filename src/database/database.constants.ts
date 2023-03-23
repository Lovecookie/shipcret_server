export class FDatabaseConstants {
    /**
     * @description This is the name of the database.
     */
    static readonly accountdb = () => process.env.ACCOUNT_DB;
    static readonly contentdb = () => process.env.CONTENT_DB;

    /**
     * @description This is the name of database connection.
     */
    static readonly DATA_SOURCE = 'DATA_SOURCE';

    /**
     * @description This is the name of the repositorys.
     */
    static readonly USER_REPOSITORY = 'USER_REPOSITORY';
    static readonly FEED_REPOSITORY = 'FEED_REPOSITORY';
    static readonly FRIEND_REPOSITORY = 'FRIEND_REPOSITORY';

    /**
     * @description This is the name of the account table.
     */
    static readonly USERS_TABLE = 'users';
    static readonly FRIENDS_TABLE = 'friends';

    /**
     * @description This is the name of the feed table.
     */
    static readonly FEEDS_TABLE = 'feeds';
}
