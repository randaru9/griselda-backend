import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { LessonEntity } from './entities/lesson.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  controllers: [LessonController],
  providers: [LessonService],
  imports: [
    TypeOrmModule.forFeature([LessonEntity]),
    CategoryModule
  ],
})
export class LessonModule {}
