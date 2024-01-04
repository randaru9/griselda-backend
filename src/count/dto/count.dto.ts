import { Transform } from 'class-transformer';
import { 
	IsNumber,
	IsNotEmpty,
} from 'class-validator';

export class CreateCountDTO {
	@IsNotEmpty({ message: 'name wajib diisi' })
	@Transform(({ value }) => value.toLowerCase())
	name : string;
	@IsNotEmpty({ message: 'Jumlah member wajib diisi' })
    @IsNumber({}, { message: 'Jumlah member harus berupa angka' })
	value: number;
}

export class UpdateCountDTO {
	@IsNotEmpty({ message: 'Jumlah member wajib diisi' })
    @IsNumber({}, { message: 'Jumlah member harus berupa angka' })
	value: number;
}






