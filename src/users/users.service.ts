import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

// Class UseraServices is used for provide basic curd operations on user entity
@Injectable()
export class UsersService {
    //injecting User repository using Injector
    constructor(@InjectRepository(User) private repo: Repository<User>) {}
    //Create method for user
    create(email: string, password: string){
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }
    //findOne is userd for finding user with id
    findOne(id: number) { 
        return this.repo.findOne({
            where: { id }
        });
    }
    //find method is used to find list of users with given email
    find(email: string) { 
        return this.repo.find({
            where: { email }
        });
    }
    //Update is used for updatiing user
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("User not found");
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    //Remove is used for removing a user 
    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException("User not found");
        }
        return this.repo.remove(user);
    }
}
