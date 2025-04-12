import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authService } from './auth.service'

const createUser = catchAsync(async (req, res) => {
  const result = await authService.createUser(req.body)

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to create user',
      data: null,
    })
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'user registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body.email, req.body.password)
  const { accessToken } = result

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user logged in successfully',
    data: { token: accessToken },
  })
})

const getUserCredit = catchAsync(async (req, res) => {
  const result = await authService.getUserCredit(req.params.userid)

  console.log(!result)

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to get user credit',
      data: null,
    })
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user credit fetched successfully',
    data: Number(result),
  })
})

export const authController = {
  createUser,
  loginUser,
  getUserCredit,
}
