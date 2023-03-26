export class FCommonConstants {
    static isProduction = () =>
        process.env.SERVER_MODE === 'dev' ? false : true;

    static IS_PUBLIC = 'isPublic';
    static TOKEN_BEARER = 'Bearer';

    static JWT_TOKEN = 'jwt-token';
    static JWT_TOKEN_REFRESH = 'jwt-token-refresh';
}
