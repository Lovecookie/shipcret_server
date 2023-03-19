import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    const config = new DocumentBuilder()
        .setTitle('C.I.C')
        .setDescription('The C.I.C API description')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    app.enableCors({
        origin: 'http://localhost:8000',
        credentials: true,
    });

    const port = process.env.SERVER_PORT;
    await app.listen(port);
}
bootstrap();
