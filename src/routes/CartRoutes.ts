import express from 'express';
import { 
    getCartItems,
    addItemToCart,
    getCartItemById
} from '../controllers/CartController';

import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/addItemToCart', authMiddleware, addItemToCart)
router.get('/getCartItems', getCartItems);
router.get('/getCartItem', getCartItemById)

export default router;
