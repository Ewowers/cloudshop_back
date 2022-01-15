import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ProductDto {
  //dto создание товара
  title: string; //название
  prise: number; //цена
  que: number; //количество
  category: string; //категория
}
//товар
export type ProductDocuemnt = Product & Document;
@Schema()
export class Product {
  @Prop({ required: true, unique: true })
  title: string; //название
  @Prop({ required: true })
  prise: number; //цена
  @Prop({ required: true })
  que: number; //количество
  @Prop({ required: true })
  category: string; //категория
}
export const ProductShema = SchemaFactory.createForClass(Product);
//категорий
export interface CategoryeDto {
  //dto создание категорий
  value: string;
}
export type CategoryDocuemnt = Category & Document;
@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  value: string;
}
export const CategoryShema = SchemaFactory.createForClass(Category);
