import { 
	Min,
	IsNumber,
	IsString,
	MaxLength, 
	IsNotEmpty,
	IsOptional 
} from 'class-validator';
import { 
	ApiProperty, 
	ApiPropertyOptional, 
	IntersectionType 
} from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class IDDto {
	@ApiProperty({ default: 'id' })
	@IsNotEmpty({ message: 'ID wajib diisi' })
	@IsString({ message: 'ID harus berupa string' })
	id: string;
}

export class CategoryNameDto {
	@ApiProperty({ default: 'Kategori' })
	@IsNotEmpty({ message: 'Kategori wajib diisi' })
	@IsString({ message: 'Kategori harus berupa string' })
	@MaxLength(255, { message: 'Kategori tidak boleh melebihi $constraint1 karakter' })
	@Transform(({ value }) => value.toLowerCase())
	name: string;
}

export class SearchDto {
	@ApiPropertyOptional({ default: 'Search' })
	@IsOptional()
	@IsString({ message: 'Pencarian harus berupa string' })
	@MaxLength(255, { message: 'Pencarian tidak boleh melebihi $constraint1 karakter' })
	@Transform(({ value }) => value.toLowerCase())
	search: string;
}

export class PaginationDto {
	@ApiPropertyOptional({ default: 1 })
	@IsOptional()
	@IsNumber({}, { message: 'Halaman harus berupa angka' })
	@Min(1, { message: 'Halaman tidak boleh kurang dari $constraint1' })
	@Type(() => Number)
	page: number;

	@ApiPropertyOptional({ default: 5 })
	@IsOptional()
	@IsNumber({}, { message: 'Batas data harus berupa angka' })
	@Min(1, { message: 'Batas data tidak boleh kurang dari $constraint1' })
	@Type(() => Number)
	limit: number;
}

export class FilterDto extends IntersectionType(SearchDto, PaginationDto) {}
export class CategoryUpdateDto extends IntersectionType(IDDto, CategoryNameDto) {}
