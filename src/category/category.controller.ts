import { AdminGuard } from './../utils/jwt.guard';
import { 
	Get,
	Put,
	Post,
	Body,
	Query,
	Delete, 
	Inject,
	UseGuards,
	Controller,
	HttpStatus,
	HttpException
} from '@nestjs/common';
import { AdminEntity } from 'src/admin/entities/admin.entity';
import { GetUser, RESPONSE, RESPONSE_I } from 'src/utils';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { CategoryNameDto, CategoryUpdateDto, FilterDto, IDDto } from './dto/category.dto';
import { Pagination } from 'nestjs-typeorm-paginate';


@Controller('category')
export class CategoryController {
  constructor(
		@Inject('CATEGORY_SERVICE') private readonly categoryService: CategoryService
  ) {}

  async createCategory (author: AdminEntity, name: string): Promise<RESPONSE_I> {
		let id: string | null = null;
		let msg: string = 'Berhasil menambahkan kategori';
		const categoryExists: CategoryEntity | null = await this.categoryService.getTrashedCategoryByName(name);

		if (categoryExists && !categoryExists?.delete_at) {
			throw new HttpException('Kategori telah digunakan', HttpStatus.CONFLICT);
		} else if (categoryExists && categoryExists?.delete_at) {
			id = categoryExists.id;
			msg = 'Berhasil mengembalikan kategori';
			await this.categoryService.restoreCategory(id);
			await this.categoryService.updateCategory(id, author);
		} else {
			const newCategory: CategoryEntity = await this.categoryService.createCategory(author, name);
			id = newCategory.id;
		}

		if (id) {
			const category: CategoryEntity = await this.categoryService.getCategoryById(id);

			return RESPONSE(category, msg, HttpStatus.CREATED);
		}
		return;
	}

	// CREATE - Add Category
	@UseGuards(AdminGuard)
	@Post('/add')
	async addCategory (@Body() nameDto: CategoryNameDto, @GetUser() author: AdminEntity): Promise<RESPONSE_I> {
		const { name } = nameDto;
		return await this.createCategory(author, name);
	}

	// READ - Get Category with Search
	@UseGuards(AdminGuard)
	@Get('/all')
	async getPaginationCategory (@Query() filterDto: FilterDto): Promise<RESPONSE_I> {
		const { search } = filterDto;
		let status: HttpStatus = HttpStatus.OK;
		let msg: string = 'Berhasil mendapatkan daftar kategori';
		const categories: Pagination<CategoryEntity> = await this.categoryService.getPaginationCategory(filterDto);

		if (categories.items.length === 0) {
			msg = 'Daftar kategori kosong';
			status = HttpStatus.NO_CONTENT;
			if (search) {
				msg = 'Kategori tidak ditemukan';
			}
		}

		return RESPONSE(categories, msg, status);
	}

	// READ - Get Category List
	@UseGuards(AdminGuard)
	@Get('/list')
	async getAllCategory (): Promise<RESPONSE_I> {
		let status: HttpStatus = HttpStatus.OK;
		let msg: string = 'Berhasil mendapatkan daftar kategori';
		const categories: CategoryEntity[] = await this.categoryService.getAllCategory();

		if (categories.length === 0) {
			msg = 'Daftar kategori kosong';
			status = HttpStatus.NO_CONTENT;
		}

		return RESPONSE(categories, msg, status);
	}

	// UPDATE - Update Category
	@UseGuards(AdminGuard)
	@Put('/update')
	async updateCategory (
		@Body() updateDto: CategoryUpdateDto, @GetUser() author: AdminEntity
	): Promise<RESPONSE_I> 
	{
		const { id, name } = updateDto;

		const categoryExists: CategoryEntity | null = await this.categoryService.getCategoryById(id);

		if (!categoryExists) {
			throw new HttpException('Kategori tidak dapat ditemukan', HttpStatus.NOT_FOUND);
		}

		if (categoryExists.name === name) {
			throw new HttpException('Kategori tidak ada perubahan', HttpStatus.BAD_REQUEST);
		}

		await this.categoryService.updateCategory(id, author);
		await this.categoryService.deleteCategory(id);

		return this.createCategory(author, name);
	}

	// DELETE - Delete Category
	@UseGuards(AdminGuard)
	@Delete('/delete')
	async deleteCategory (
		@Body() idDto: IDDto, @GetUser() author: AdminEntity
	): Promise<RESPONSE_I> 
	{
		const { id } = idDto;
		const categoryExists: CategoryEntity | null = await this.categoryService.getCategoryById(id);

		if (categoryExists) {
			const response: any = await this.categoryService.deleteCategory(id);

			return RESPONSE(response, 'Berhasil menghapus kategori', HttpStatus.OK);
		}

		throw new HttpException('Kategori tidak dapat ditemukan', HttpStatus.NOT_FOUND);
	}
}
