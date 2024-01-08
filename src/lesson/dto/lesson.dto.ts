import { IntersectionType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { 
	IsNotEmpty,
    IsString,
    IsOptional,
    MaxLength,
    IsNumber,
    Min,
} from 'class-validator';

export class SearchDto {
	@IsOptional()
	@IsString({ message: 'Pencarian harus berupa string' })
	@MaxLength(255, { message: 'Pencarian tidak boleh melebihi $constraint1 karakter' })
	@Transform(({ value }) => value.toLowerCase())
	search: string;
}

export class PaginationDto {
	@IsOptional()
	@IsNumber({}, { message: 'Halaman harus berupa angka' })
	@Min(1, { message: 'Halaman tidak boleh kurang dari $constraint1' })
	@Type(() => Number)
	page: number;

	@IsOptional()
	@IsNumber({}, { message: 'Batas data harus berupa angka' })
	@Min(1, { message: 'Batas data tidak boleh kurang dari $constraint1' })
	@Type(() => Number)
	limit: number;
}

export class FilterDto extends IntersectionType(SearchDto, PaginationDto) {}

export class CreateLessonDTO {
	@IsNotEmpty({ message: 'name wajib diisi' })
	@IsString({ message: 'Nama harus berupa string' })
    category_id : string;
	@IsNotEmpty({ message: 'name wajib diisi' })
	@Transform(({ value }) => value.toLowerCase())
	@IsString({ message: 'Nama harus berupa string' })
	name : string;
    @IsNotEmpty({ message: 'deskripsi wajib diisi' })
    @IsString({ message: 'Deskripsi harus berupa string' })
    description : string;
    // @IsNotEmpty({ message: 'image wajib diisi' })
    image : string;
}

export class UpdateLessonDTO {
	@IsNotEmpty()
	id : string;
	@IsOptional()
	category_id : string;
	name : string;
    description : string;
    image : string;
}






