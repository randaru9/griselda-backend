import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CategoryService } from 'src/category/category.service';
import { Like, Repository } from 'typeorm';
import { CreateLessonDTO, FilterDto, UpdateLessonDTO } from './dto/lesson.dto';
import { LessonEntity } from './entities/lesson.entity';


@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository : Repository<LessonEntity>,
    @Inject('CATEGORY_SERVICE')
    private readonly categoryService : CategoryService
  ){}
  async create(createLessonDto: CreateLessonDTO) : Promise<LessonEntity> {
    const category = await this.categoryService.getCategoryById(createLessonDto.category_id);
    const newLesson : LessonEntity = await this.lessonRepository.create({
      name : createLessonDto.name,
      category : category,
      description : createLessonDto.description,
      image : createLessonDto.image,
    })
    return await this.lessonRepository.save(newLesson);
  }

  async getAll(filterDto : FilterDto) :  Promise<Pagination<LessonEntity>> {
    const { page, limit, search } = filterDto;
		const options: IPaginationOptions = {
			page: page || 1,
			limit: limit || 5
		};

		if (search) {
      return await paginate<LessonEntity>(this.lessonRepository, options, {
				where: { name: Like(`%${ search }%`) },
				order: { update_at: 'DESC' },
        relations: {
          category: true
        }
			});
		}

    return await paginate<LessonEntity>(this.lessonRepository, options, {
			order: { update_at: 'DESC' },
      relations: {
        category: true
      }
		});
  }

  getById(id: string) {
    return this.lessonRepository.findOne({ where : { id }, relations: { category: true } });
  }

  getByCategory(id: string) {
    if(id == ""){
      return this.lessonRepository.find({relations : {category : true}});
    }
    return this.lessonRepository.find({ where : { category : { id } }, relations: { category: true } });
  }

  async update(updateLessonDto: UpdateLessonDTO) {
    // return this.lessonRepository.save(updateLessonDto);
    const updateLesson : LessonEntity = await this.getById(updateLessonDto.id);
    if(updateLessonDto.name){
      updateLesson.name = updateLessonDto.name;
    }
    if(updateLessonDto.category_id){
      const category = await this.categoryService.getCategoryById(updateLessonDto.category_id);
      updateLesson.category = category;
    }
    if(updateLessonDto.description){
      updateLesson.description = updateLessonDto.description;
    }
    if(updateLessonDto.image){
      updateLesson.image = updateLessonDto.image;
    }
    return this.lessonRepository.save(updateLesson);
  }

  delete(id: string) {
    return this.lessonRepository.softDelete(id);
  }
}
