export class FCommonConstants {
    static isProduction = () =>
        process.env.SERVER_MODE === 'dev' ? false : true;

    static IS_PUBLIC = 'isPublic';
    static TOKEN_BEARER = 'Bearer';
}
