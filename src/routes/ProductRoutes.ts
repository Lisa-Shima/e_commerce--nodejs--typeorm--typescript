import express from 'express'
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/ProductController'

const router = express.Router()

router.post('/createProduct', createProduct)
router.get('/getProducts', getProducts)
router.get('/getProduct/:id', getProductById)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)

export default router