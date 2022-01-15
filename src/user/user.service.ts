import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Role,
  RoleDocuemnt,
  User,
  UserDocuemnt,
  UserDto,
  loginDto,
} from './user.schem';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocuemnt>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocuemnt>,
  ) {}
  async get() {
    //получение всех пользователей
    let users = await this.userModel.find();
    return users;
  }
  async create(dto: UserDto) {
    const candidate = await this.userModel.findOne({ username: dto.username });
    if (candidate) {
      throw new HttpException('Логин занят', HttpStatus.BAD_REQUEST);
    }
    console.log(candidate);
    const role = await this.roleModel.findById(dto.role);
    const user = new this.userModel({ ...dto, role: role }).save();
    return user;
  }
  async login(dto: loginDto) {
    const admin = await this.userModel.findOne({ username: 'admin' });
    if (!admin) {
      new this.userModel({
        username: 'admin',
        password: 'admin',
        role: { value: 'admin', descrption: 'Админ' },
      }).save();
    }
    const user = await this.userModel.findOne(dto);
    if (!user) {
      throw new HttpException(
        'Не верный логин или пороль',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { token: user._id, role: user.role.value };
  }
  async load(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { role: user.role.value };
  }
  async getRole() {
    const admin = await this.roleModel.findOne({ value: 'admin' });
    const cashier = await this.roleModel.findOne({ value: 'cashier' });
    if (!admin) {
      new this.roleModel({ value: 'admin', description: 'Админ' }).save();
    }
    if (!cashier) {
      new this.roleModel({ value: 'cashier', description: 'Кассир' }).save();
    }
    const roles = await this.roleModel.find();
    return roles;
  }
  async update(dto: UserDto, id: string) {
    const role = await this.roleModel.findById(dto.role);
    const user = await this.userModel.findByIdAndUpdate(id, {
      ...dto,
      role: role,
    });
    return user;
  }
  async destroy(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }
}
