// src/controllers/CartItemController.ts

import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { CartItem } from '../entities/CartItem';
import { Cart } from '../entities/Cart';

export const updateCartItem = async (req: Request, res: Response) => {
  const { cartItemId } = req.params;
  const parsedId = parseInt(cartItemId)
  const { quantity } = req.body;

  try {
    const cartItemRepository = getRepository(CartItem);
    const cartItem = await cartItemRepository.findOne({where: {id: parsedId}});

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItemRepository.save(cartItem);

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not update cart item' });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { cartItemId } = req.params;
  const parsedId = parseInt(cartItemId)

  try {
    const cartItemRepository = getRepository(CartItem);
    const cartItem = await cartItemRepository.findOne({where: {id: parsedId}});

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await cartItemRepository.remove(cartItem);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete cart item' });
  }
};

// Other methods for CRUD operations on cart items
