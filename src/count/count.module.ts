import { Module } from '@nestjs/common';
import { CountService } from './count.service';
import { CountController } from './count.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountEntity } from './entities/count.entity';


const providers = [
  {
    provide: 'COUNT_SERVICE',
    useClass: CountService
  }
];

const imports = [TypeOrmModule.forFeature([CountEntity])];

@Module({
	imports,
  controllers: [CountController],
	providers,
	exports: providers
})
export class CountModule {}
