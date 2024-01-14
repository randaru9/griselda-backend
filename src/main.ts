import {
	HttpStatus,
	HttpException,
	ValidationPipe
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import {
	ErrorI,
	MapError,
	HttpExceptionFilter
} from './utils';
import { AppModule } from './app.module';
import * as path from "path";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	// Set 'api' prefix
	app.setGlobalPrefix('api');
	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ extended: true, limit: '50mb' }));
	// Use global pipes
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => {
				const result: ErrorI[] = MapError(errors);
				return new HttpException(result, HttpStatus.BAD_REQUEST);
			},
			stopAtFirstError: false,
		}),
	);
	// Use global exception filters
	app.useGlobalFilters(new HttpExceptionFilter());
	// // Use swagger module
	// const config = new DocumentBuilder()
	// .setDescription('Point of Sale API Documentation')
	// .setTitle('Point of Sale')
	// .setVersion('0.0.1')
	// .addBearerAuth()
	// .build();
	// const swaggerDoc = SwaggerModule.createDocument(app, config);
	// SwaggerModule.setup('api-documentation', app, swaggerDoc);
	app.useStaticAssets(path.join(__dirname, "../uploads"));
	await app.listen(3001);
}
bootstrap();
