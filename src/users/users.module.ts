import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User  } from './user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],//importing user entity for this module
  controllers: [UsersController],//specify controller for specific module
  providers: [UsersService, AuthService]//specifying services using in this module
})
export class UsersModule {}
