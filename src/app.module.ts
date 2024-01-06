import { TypeOrmConfig } from './utils/TypeOrmConfig';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
// import { AppService } from './app.service';
import { Configuration } from './utils/Configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';
import { CategoryModule } from './category/category.module';
import { CountModule } from './count/count.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    NestjsFormDataModule,
    AdminModule,
    AuthModule,
    LessonModule,
    CategoryModule,
    CountModule
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
