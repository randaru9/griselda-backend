import { Controller, Get, Post, Put, Delete ,Body, Res, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {Response} from "express";
import { CreateLessonDTO } from './dto/lesson.dto';
import { LessonService } from './lesson.service';
import  * as path from "path";
import * as fs from 'fs/promises';

interface FileParams {
  fileName : string;
}

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination : "./storage/",
      filename : (req , file , cb) => {
        console.log(req.query);
        cb(null , `${Date.now() + file.originalname}`)
      }
    })
  }))
  upload(@UploadedFile () file) {
    return file.filename;
  }

  @Put('/updateFile')
  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination : "./storage/",
      filename : (req , file , cb) => {
        console.log(req.query);
        cb(null , `${req.query.name}`)
      }
    })
  }))
  updatefile(@UploadedFile () file) {
    return file.filename;
  }

  @Get('/getFile')
  getFile(@Res() res : Response, @Query() req)
  {
    res.sendFile(path.join(__dirname , `../../storage/${req.name}`));
  }

  @Delete('deleteFile')
  deleteFile(@Body() file) {
    fs.unlink(path.join(__dirname , `../../storage/${file.file}`))
  }

  // @Get()
  // findAll() {
  //   return this.lessonService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
  //   return this.lessonService.update(+id, updateLessonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lessonService.remove(+id);
  // }
}
