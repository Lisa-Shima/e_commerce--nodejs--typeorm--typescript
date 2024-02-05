import express from 'express'
import {
    registerUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/UserController'

const router = express.Router()

router.post('/createUser', registerUser)
router.get('/getUsers', getUsers)
router.get('/getUser/:id', getUserById)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)

export default router;