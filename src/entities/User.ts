import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  address: string ;

  @Column({ nullable: true })
  phoneNumber: string ;

  @Column({ nullable: true })
  dateOfBirth: string ;

  // Add more columns as needed
}
