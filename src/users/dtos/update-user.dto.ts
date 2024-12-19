import { IsEmail, IsOptional, IsString } from 'class-validator';
// validating Update User Body
export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    password:string;
}