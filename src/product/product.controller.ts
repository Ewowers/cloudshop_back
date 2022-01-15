import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CategoryeDto, ProductDto } from './product.schem';
import { ProductService } from './product.service';
@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Get('category')
  getGategory() {
    return this.service.getGategory();
  }
  @Get('/')
  get() {
    //получение всех товаров
    return this.service.get();
  }
  @Post('/')
  create(@Body() body: ProductDto) {
    //создать продукт
    return this.service.create(body);
  }
  @Post('/category')
  createGategory(@Body() dto: CategoryeDto) {
    //создание категорий
    return this.service.createCategory(dto);
  }
  @Put(':id')
  update(@Body() dto: ProductDto, @Param('id') id: string) {
    //редактировать продукт
    return this.service.update(dto, id);
  }
  @Delete(':id')
  destroy(@Param('id') id: string) {
    //удаление товара
    return this.service.destroy(id);
  }
}
