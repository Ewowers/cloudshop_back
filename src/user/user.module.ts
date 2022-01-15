import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Role, RoleShema, User, UserShema } from './user.schem';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserShema },
      { name: Role.name, schema: RoleShema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
