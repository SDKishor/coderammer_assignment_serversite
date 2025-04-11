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

export const transactionController = {
  createTransaction,
}
