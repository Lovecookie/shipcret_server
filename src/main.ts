import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as expressBasicAuth from 'express-basic-auth';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

class ShipcretApplication {
    private logger = new Logger(ShipcretApplication.name);
    private isDev: boolean;
    private port: string;
    private corsOriginList: string[];
    private adminUser: string;
    private adminPassword: string;

    constructor(private server: NestExpressApplication) {
        this.server = server;

        if (!process.env.SECRET_KEY) {
            this.logger.error('SECRET_KEY is not defined');
            process.exit(1);
        }

        this.isDev = process.env.NODE_ENV === 'production' ? false : true;
        this.port = process.env.SERVER_PORT || '8000';
        this.corsOriginList = process.env.CORS_ORIGIN_LIST
            ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) =>
                  origin.trim()
              )
            : ['*'];
        this.adminUser = process.env.ADMIN_USER || 'schipret';
        this.adminPassword = process.env.ADMIN_PASSWORD || '3690';
    }

    private _setUpBasicAuth() {
        this.server.use(
            ['/docs', '/docs-json'],
            expressBasicAuth({
                challenge: true,
                users: {
                    [this.adminUser]: this.adminPassword
                }
            })
        );
    }

    private _setUpOpenApiMiddleware() {
        SwaggerModule.setup(
            'docs',
            this.server,
            SwaggerModule.createDocument(
                this.server,
                new DocumentBuilder()
                    .setTitle('SHIPcret - API')
                    .setDescription('The SHIPcret API description')
                    .setVersion('1.0.0')
                    .build()
            )
        );
    }

    private _setUpGlobalMiddlewares() {
        this.server.enableCors({
            origin: this.corsOriginList,
            credentials: true
        });
        this.server.use(cookieParser());
        this._setUpBasicAuth();
        this._setUpOpenApiMiddleware();
        this.server.useGlobalPipes(
            new ValidationPipe({
                transform: true
            })
        );

        this.server.use(
            expressSession({
                secret: process.env.SECRET_KEY,
                resave: true,
                saveUninitialized: true
            })
        );

        this.server.use(passport.initialize());
        this.server.use(passport.session());

        this.server.useGlobalFilters(new HttpExceptionFilter());
    }

    async boostrap() {
        await this._setUpGlobalMiddlewares();
        await this.server.listen(this.port);
    }

    startLog() {
        if (this.isDev) {
            this.logger.log(
                `💜💜💜💜💜💜 Server on http://localhost:${this.port} 💜💜💜💜💜💜`
            );
        } else {
            this.logger.log(
                `💜💜💜💜💜💜 Server on port ${this.port} 💜💜💜💜💜💜`
            );
        }
    }

    errorLog(error: string) {
        this.logger.error(`🆘 Server error ${error}`);
    }
}

async function init(): Promise<void> {
    const server = await NestFactory.create<NestExpressApplication>(AppModule);
    const app = new ShipcretApplication(server);
    await app.boostrap();
    app.startLog();
}

init().catch((error) => {
    new Logger('init').error(error);
});
