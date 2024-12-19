import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

//specifying main root path as auth for getting requests for user module
@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor( 
        private userService: UsersService,//injecting user services using DI
        private authService: AuthService//injecting auth services using DI
    ){}

    //specifying path for get decorator to use mentioned service with session
    @Get("/whoami")
    whoAmI(@Session() session:any){
        return this.userService.findOne(session.userId);
    }
    //specifying path for post decorator to use signout service  with session
    @Post("/signout")
    signout(@Session() session:any){
        session.userId=null;
    }
    //specifying path for post decorator to use signup service  with session and validating body data with CreateUserDTO
    @Post('/signup')
    async createUser(@Body() body:CreateUserDto, @Session() session:any){
        const user = await this.authService.signUp(body.email, body .password);
        session.userId = user.id
        return user
    }
    //specifying path for post decorator to use signin service  with session and validating body data with CreateUserDTO
    @Post('/signin')
    async signInUser(@Body() body:CreateUserDto , @Session() session:any){
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id
        return user
    }
    //specifying path for get decorator to use find user with id
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user =  await this.userService.findOne(parseInt(id)); 
        if(!user) {
            throw new NotFoundException("User not found.");
        }
        return user;
    }
    //specifying path for get decorator to use find user with email
    @Get()
    findAllUser(@Query('email') email: string) {
        return this.userService.find(email);
    }
    //specifying path for delete decorator to use delete user service
    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }
    //specifying path for patch decorator to use update user service and validating body with UpdateUserDTO
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body:UpdateUserDto) {
        return this.userService.update(parseInt(id), body)
    }
}
