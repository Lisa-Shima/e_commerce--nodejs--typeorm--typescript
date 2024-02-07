// src/entities/CartItem.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { Cart } from './Cart';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" }) // Specify the correct column name here
  product: Product;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, cart => cart.items)
  @JoinColumn({ name: "cart_id" }) // Specify the correct column name here
  cart: Cart;

  // Add more columns as needed
}
