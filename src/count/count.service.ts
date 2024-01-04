import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CountEntity } from './entities/count.entity';
import { Repository } from 'typeorm';
import { CreateCountDTO, UpdateCountDTO } from './dto/count.dto';
// import { CreateCountDto } from './dto/create-count.dto';
// import { UpdateCountDto } from './dto/update-count.dto';

@Injectable()
export class CountService {
  constructor(
    @InjectRepository(CountEntity)
    private readonly countRepository: Repository<CountEntity>
  ) {}

 async create(createCountDto: CreateCountDTO) {
    const newCount : CountEntity = await this.countRepository.create(createCountDto);
    return await this.countRepository.save(newCount); 
  }

  async findAll() : Promise<CountEntity[]> {
    return await this.countRepository.find() 
  }

  async findOne(name: string) {
    const count = await this.countRepository.findOneBy({ name });
    if(count) {
      return count;
    }
    return {message : 'Nama jumlah tidak ditemukan'};
  }
  

  async update(name: string, updateCountDto: UpdateCountDTO) {
    const count: CountEntity = await this.countRepository.findOneBy({ name });
    if(count) {
      count.value = updateCountDto.value;
      return await this.countRepository.save(count);
    }
    return {message : 'Count tidak ditemukan'}
  }

}
