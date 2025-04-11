import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { transactionService } from './transaction.service'

const createTransaction = catchAsync(async (req, res) => {
  const result = await transactionService.createTransaction(req.body)

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to create Transaction',
      data: null,
    })
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Transaction created successfully',
    data: result,
  })
})

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await transactionService.getAllTransactions()

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to get Transactions',
      data: null,
    })
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Transactions fetched successfully',
      data: result,
    })
  }
})

const getUserTransactions = catchAsync(async (req, res) => {
  const result = await transactionService.getUserTransactions(req.params.userid)

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to get Transactions',
      data: null,
    })
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Transactions fetched successfully',
      data: result,
    })
  }
})

const approveTransaction = catchAsync(async (req, res) => {
  const result = await transactionService.approveTransaction(req.params.id)

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to approve Transaction',
      data: null,
    })
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Transaction approved successfully',
      data: result,
    })
  }
})

const rejectTransaction = catchAsync(async (req, res) => {
  const result = await transactionService.rejectTransaction(req.params.id)

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to reject Transaction',
      data: null,
    })
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Transaction rejected successfully',
      data: result,
    })
  }
})

export const transactionController = {
  createTransaction,
  getAllTransactions,
  approveTransaction,
  rejectTransaction,
  getUserTransactions,
}
