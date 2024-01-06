import { NestjsFormDataModule } from 'nestjs-form-data';
import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [
    NestjsFormDataModule,
  ],
})
export class LessonModule {}
