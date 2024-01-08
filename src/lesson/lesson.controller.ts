import { Controller, Get, Post, Put, Delete ,Body, Res, UseInterceptors, UploadedFile, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {Response} from "express";
import { CreateLessonDTO, FilterDto, UpdateLessonDTO } from './dto/lesson.dto';
import { LessonService } from './lesson.service';
import  * as path from "path";
import * as fs from 'fs/promises';
import { Pagination } from 'nestjs-typeorm-paginate';
import { LessonEntity } from './entities/lesson.entity';
import { AdminGuard, RESPONSE } from 'src/utils';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Get('/getFile')
  getFile(@Res() res : Response, @Query() req)
  {
    res.sendFile(path.join(__dirname , `../../storage/${req.name}`));
  }

  @UseGuards(AdminGuard)
  @Delete('/deleteFile')
  deleteFile(@Body() file) {
    fs.unlink(path.join(__dirname , `../../storage/${file.file}`))
  }

  @UseGuards(AdminGuard)
  @Post('/create')
  create(@Body() createLessonDto: CreateLessonDTO) {
    return this.lessonService.create(createLessonDto);
  }

  @UseGuards(AdminGuard)
  @Get('/getAll')
  async getAll(@Query() filterDto : FilterDto) {
    const { search } = filterDto;
		let status: HttpStatus = HttpStatus.OK;
		let msg: string = 'Berhasil mendapatkan daftar kategori';
    const categories: Pagination<LessonEntity> = await this.lessonService.getAll(filterDto);
		if (categories.items.length === 0) {
			msg = 'Daftar kategori kosong';
			status = HttpStatus.NO_CONTENT;
			if (search) {
				msg = 'Kategori tidak ditemukan';
			}
		}
		return RESPONSE(categories, msg, status);
  }

  @UseGuards(AdminGuard)
  @Get('getById')
  getById(@Body('id') id: string) {
    return this.lessonService.getById(id);
  }

  @UseGuards(AdminGuard)
  @Put('/update')
  update(@Body() updateLessonDto: UpdateLessonDTO) {
    return this.lessonService.update(updateLessonDto);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete')
  delete(@Body('id') id: string) {
    return this.lessonService.delete(id);
  }

}
