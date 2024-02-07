import express from 'express';
import { 
    updateCartItem,
    deleteCartItem 
} from './../controllers/CartItemController';

const router = express.Router();

router.put('/updateCartItem', updateCartItem);
router.delete('/deleteCartItem', deleteCartItem)

export default router;
