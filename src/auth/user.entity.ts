import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';

// unique decorator makes sure we don't have duplicate emails stored
// methods like validatePassword below can be called on all instances of User

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    // @OneToMany(type => Task, task => task.user, { eager: true })
    // tasks: Task[];

    // bcrypt takes the password provided in the request (which could be wrong)
    // and the salt stored in the database for the specific user
    // if the password provided is correct then bcrypt will successfully generate
    // the correct hash which will match the hashed password we have stored in the database
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
