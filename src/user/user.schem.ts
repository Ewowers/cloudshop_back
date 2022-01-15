import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export interface loginDto {
  //dto авторизаций
  username: string; //логин
  password: string; //пороль
}
export interface UserDto {
  //dto создание пользователя
  username: string; //логин
  password: string; //пороль
  role: RoleDto; //роль
}
//user
export type UserDocuemnt = User & Document;
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string; //логин
  @Prop({ required: true })
  password: string; //пороль
  @Prop({ required: true, type: Object })
  role: RoleDto; //роль
}
export const UserShema = SchemaFactory.createForClass(User);
//role
export interface RoleDto {
  //dto создание
  value: string;
  description: string;
}
export type RoleDocuemnt = Role & Document;
@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  value: string;
  @Prop()
  description: string;
}
export const RoleShema = SchemaFactory.createForClass(Role);
