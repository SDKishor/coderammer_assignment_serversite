import { Router } from 'express'
import { authController } from './auth.controller'

const router = Router()

router.post('/register', authController.createUser)

router.post('/login', authController.loginUser)

router.get('/credit/:userid', authController.getUserCredit)

export const userRoutes = router
