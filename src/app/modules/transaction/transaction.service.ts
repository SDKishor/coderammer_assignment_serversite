import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { ITransaction } from './transaction.interface'
import TransactionModel from './transaction.model'
import UserModel from '../auth/user.model'

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

const getAllTransactions = async () => {
  const result = await TransactionModel.find()
  return result
}

const getUserTransactions = async (id: string) => {
  const result = await TransactionModel.find({ user: id })
  return result
}

const approveTransaction = async (id: string) => {
  const transaction = await TransactionModel.findById(id)

  if (!transaction) {
    throw new AppError('Transaction not found', StatusCodes.NOT_FOUND)
  }
  if (transaction.status !== 'pending') {
    throw new AppError('Transaction is not pending', StatusCodes.BAD_REQUEST)
  }

  // Start a session for transaction
  const session = await TransactionModel.startSession()
  session.startTransaction()
  try {
    transaction.status = 'approved'
    await transaction.save({ session })

    await UserModel.findByIdAndUpdate(
      transaction.user,
      { $inc: { credit: transaction.amount } },
      { session },
    )
    await session.commitTransaction()
    return transaction
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

const rejectTransaction = async (id: string) => {
  const transaction = await TransactionModel.findById(id)

  if (!transaction) {
    throw new AppError('Transaction not found', StatusCodes.NOT_FOUND)
  }
  if (transaction.status !== 'pending') {
    throw new AppError('Transaction is not pending', StatusCodes.BAD_REQUEST)
  }

  // Start a session for transaction
  const session = await TransactionModel.startSession()
  session.startTransaction()
  try {
    transaction.status = 'rejected'
    await transaction.save({ session })
    await session.commitTransaction()
    return transaction
  } catch (error) {
    await session.abortTransaction()
    throw error
  } finally {
    session.endSession()
  }
}

export const transactionService = {
  createTransaction,
  getAllTransactions,
  approveTransaction,
  rejectTransaction,
  getUserTransactions,
}
