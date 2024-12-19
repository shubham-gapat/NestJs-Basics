import { IsEmail, IsString } from 'class-validator';
// validating Create User Body
export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsString()
    password:string;
}