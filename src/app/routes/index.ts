import { Router } from 'express'
import { userRoutes } from '../modules/auth/auth.route'
import { transactionRoutes } from '../modules/transaction/transaction.route'

const router = Router()

const modulesRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/transaction',
    route: transactionRoutes,
  },
]

modulesRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
