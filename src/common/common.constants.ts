export class FCommonConstants {
    static isProduction = () =>
        process.env.SERVER_MODE === 'dev' ? false : true;
}
