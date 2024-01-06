import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/utils';
import { CountService } from './count.service';
import { CreateCountDTO, UpdateCountDTO } from './dto/count.dto';
@Controller('count')
export class CountController {
  constructor(
    @Inject('COUNT_SERVICE') private readonly countService: CountService
    ) {}

	// @UseGuards(AdminGuard)
  // @Post('/create')
  // create(@Body() createCountDto: CreateCountDTO) {
  //   return this.countService.create(createCountDto);
  // }

	@UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.countService.findAll();
  } 

	@UseGuards(AdminGuard)
  @Get('get/:name')
  findMember(@Param('name') name: string) {
    return this.countService.findOne(name);
  }

	@UseGuards(AdminGuard)
  @Put('update/:name')
  update(@Param('name') name: string, @Body() updateCountDto: UpdateCountDTO) {
    return this.countService.update(name, updateCountDto);
  }

}
