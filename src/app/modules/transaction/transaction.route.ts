import { Router } from 'express'
import { transactionController } from './transaction.controller'
import auth from '../../middlewares/auth'

const router = Router()

router.post('/create', transactionController.createTransaction)

router.get('/', auth('admin'), transactionController.getAllTransactions)

router.get('/:userid', transactionController.getUserTransactions)

router.patch(
  '/approve/:id',
  auth('admin'),
  transactionController.approveTransaction,
)

router.patch(
  '/reject/:id',
  auth('admin'),
  transactionController.rejectTransaction,
)

export const transactionRoutes = router
