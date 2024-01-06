import { Transform } from 'class-transformer';
import { 
	IsNotEmpty,
    IsString,
    IsOptional,
} from 'class-validator';

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
	@IsOptional()
	name : string;
    description : string;
    image : string;
}






