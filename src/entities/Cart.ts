// src/entities/Cart.ts

import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { CartItem } from './CartItem';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" }) // Specify the correct column name here
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  items: CartItem[];

  // Add more columns as needed
}
