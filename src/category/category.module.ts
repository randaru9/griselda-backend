import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity'; 

const providers = [
{
	provide: 'CATEGORY_SERVICE',
	useClass: CategoryService
}
];
const imports = [TypeOrmModule.forFeature([CategoryEntity])];

@Module({
	imports,
  controllers: [CategoryController],
	providers,
	exports: providers
})
export class CategoryModule {}
