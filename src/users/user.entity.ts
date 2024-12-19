import { AfterInsert, AfterUpdate, AfterRemove, Entity, Column, PrimaryGeneratedColumn  } from "typeorm";
//Creating table of user in db using User entity
@Entity()
export class User {
    @PrimaryGeneratedColumn()//defining primary column
    id: number;

    @Column() //defining normal columns
    email: string; // column name with there data type

    @Column() //defining normal columns
    password: string; // column name with there data type

    @AfterInsert()//we can specify logic here after inserting any value in this table
    logInsert() {
        console.log("user inserted with id,",  this.id)
    }

    @AfterRemove()//we can specify logic here after removing any value in this table
    logRemove() {
        console.log("user removed with id,",  this.id)
    }

    @AfterUpdate()//we can specify logic here after updating any value in this table
    logUpdate() {
        console.log("user updated with id,",  this.id)
    }
}