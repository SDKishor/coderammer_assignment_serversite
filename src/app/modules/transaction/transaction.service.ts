import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { ITransaction } from './transaction.interface'
import TransactionModel from './transaction.model'

const createTransaction = async (transaction: ITransaction) => {
  const { amount, description, user } = transaction

  const newTransaction = await TransactionModel.create([
    { amount, description, user },
  ])

  if (!newTransaction.length) {
    throw new AppError('Failed to create student', StatusCodes.BAD_REQUEST)
  }
  const result = {
    _id: newTransaction[0]._id,
    amount: newTransaction[0].amount,
    description: newTransaction[0].description,
    status: newTransaction[0].status,
    user: newTransaction[0].user,
  }
  return result
}

export const transactionService = {
  createTransaction,
}
