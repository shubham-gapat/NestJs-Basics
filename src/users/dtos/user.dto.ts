import { Expose } from "class-transformer";
//exposing id and email only from user entity
export class UserDto{
    @Expose()
    id: number;

    @Expose()
    email: string;
}