import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocuemnt,
  CategoryeDto,
  Product,
  ProductDocuemnt,
  ProductDto,
} from './product.schem';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocuemnt>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocuemnt>,
  ) {}
  async get() {
    //получение всех пользователей
    let products = await this.productModel.find();
    products.forEach((item, i) => (item['key'] = i));
    return products;
  }
  async create(dto: ProductDto) {
    const candidate = await this.productModel.findOne({ title: dto.title });
    if (candidate) {
      throw new HttpException('Название занято', HttpStatus.BAD_REQUEST);
    }

    const product = new this.productModel(dto).save();
    return product;
  }
  async createCategory(dto: CategoryeDto) {
    const candidate = await this.categoryModel.findOne({ value: dto.value });
    if (candidate) {
      throw new HttpException('Название занято', HttpStatus.BAD_REQUEST);
    }
    const category = new this.categoryModel(dto).save();
    return category;
  }
  async getGategory() {
    const categoryes = await this.categoryModel.find();

    return categoryes;
  }
  async update(dto: ProductDto, id: string) {
    const original = await this.productModel.findById(id);
    if (original.title !== dto.title) {
      const candidate = await this.productModel.findOne({ title: dto.title });
      if (candidate) {
        throw new HttpException('Название занято', HttpStatus.BAD_REQUEST);
      }
    }
    const product = await this.productModel.findByIdAndUpdate(id, dto);
    return product;
  }
  async destroy(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    return product;
  }
}
