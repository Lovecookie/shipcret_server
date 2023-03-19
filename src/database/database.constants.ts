export class FDatabaseConstants {
    /**
     * @description This is the name of the database.
     */
    static readonly accountdb = () => process.env.ACCOUNT_DB;
    static readonly contentdb = () => process.env.CONTENT_DB;

    /**
     * @description This is the name of the user repository.
     */
    static readonly USER_REPOSITORY = 'USER_REPOSITORY';
    static readonly DATA_SOURCE = 'DATA_SOURCE';

    /**
     * @description This is the name of the account table.
     */
    static readonly USERS = 'users';

    /**
     * @description This is the name of the content table.
     */
    static readonly FEEDS = 'feeds';
}
