import express from 'express'
import {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
    protectedHandler
} from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/createUser', registerUser)
router.get('/getUsers', getUsers)
router.get('/getUser/:id', getUserById)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)
router.post('/login', login)
router.get('/protected', authMiddleware, protectedHandler)

export default router;