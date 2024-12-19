import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt  } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt); // used for encryption and decryption

@Injectable() //making service injectable
export class AuthService{
    constructor(private userSerivice:UsersService){}// injecting user service using DI
    //creating signup service with email and password
    async signUp(email:string, password:string){

        const users = await this.userSerivice.find(email);
        if(users.length){
            throw new BadRequestException("email is alreay in use.")
        }

        const salt = randomBytes(8).toString('hex');
        
        const hash = (await scrypt(password, salt, 32)) as Buffer; //encrpting password

        const result = salt + "." + hash.toString('hex');//converting encrypted password to sting

        const user = await this.userSerivice.create(email, result);

        return user;

    }
    //creating signin service with email and password
    async signIn(email:string, password:string){

        const [user] = await this.userSerivice.find(email);

        if(!user){
            throw new NotFoundException("user not found.");
        }

        const [salt, storedHash] = user.password.split(".");

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException("wrong password.");
        }
        
        return user;
    }
}