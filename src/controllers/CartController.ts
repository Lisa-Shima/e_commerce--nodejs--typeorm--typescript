import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';

export const addItemToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userID; // Assuming userId is available in req.user

  try {
    const cartRepository = getRepository(Cart);
    const cartItemRepository = getRepository(CartItem);
    const productRepository = getRepository(Product)

    // Check if cart already exists for the user
    let cart = await cartRepository.findOne({ where: { user: { userID: userId } } });

    // If cart doesn't exist, create a new cart
    if (!cart) {
      cart = await cartRepository.create({ user: { userID: userId } });
      await cartRepository.save(cart);
    }

    // Create a new cart item
    const existingProdId = await productRepository.findOne({where: {id: productId}})

    if(!existingProdId){
        return res.status(401).json({ message: "Product not found in stock"})
    }

    const newCartItem = cartItemRepository.create({
      product: { id: productId },
      quantity,
      cart: { id: cart.id }
    });
    await cartItemRepository.save(newCartItem);

    res.status(201).json(newCartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not add item to cart', err });
  }
};


export const getCartItems = async (req: Request, res: Response) => {
  
    try {
      const cartItemRepository = getRepository(CartItem);
      const cartItems = await cartItemRepository.find();
  
      res.status(200).json(cartItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not fetch cart items' });
    }
  };


export const getCartItemById = async (req: Request, res: Response) => {
    const { cartId } = req.params;
    const parsedId = parseInt(cartId)
  
    try {
      const cartItemRepository = getRepository(CartItem);
      const cartItem = await cartItemRepository.find({ where: { cart: { id: parsedId } } });
  
      res.status(200).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not fetch cart item' });
    }
  };
// Other methods for CRUD operations on carts
