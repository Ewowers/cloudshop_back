import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, loginDto } from './user.schem';
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Get('role')
  getRole() {
    return this.service.getRole();
  }
  @Get('users')
  get() {
    //получение всех пользователей
    return this.service.get();
  }
  @Post('login')
  login(@Body() body: loginDto) {
    //авторизация
    return this.service.login(body);
  }
  @Post('load')
  //редирект при прогрузке формы авторизаций при наличий токена
  load(@Headers('access-token') id: string) {
    return this.service.load(id);
  }
  @Post('/')
  create(@Body() body: UserDto) {
    return this.service.create(body);
  }
  @Put(':id')
  update(@Body() dto: UserDto, @Param('id') id: string) {
    return this.service.update(dto, id);
  }
  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.service.destroy(id);
  }
}
