import { Router } from 'express'
import { transactionController } from './transaction.controller'

const router = Router()

router.post('/create', transactionController.createTransaction)

export const transactionRoutes = router
