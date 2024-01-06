import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, UploadedFile } from '@nestjs/common';
import { CreateLessonDTO } from './dto/lesson.dto';
import { diskStorage } from 'multer';
// import { CreateLessonDto } from './dto/create-lesson.dto';
// import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {

  async create(createLessonDto: CreateLessonDTO, @UploadedFile() file : any) {
   console.log(createLessonDto, file); 
  }


  findAll() {
    return `This action returns all lesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  // update(id: number, updateLessonDto: UpdateLessonDto) {
  //   return `This action updates a #${id} lesson`;
  // }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
