import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',//type f db we have to use
    database: 'db.sqlite',
    entities: [User], //specifying entity with our attached db
    synchronize: true
  }),
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
