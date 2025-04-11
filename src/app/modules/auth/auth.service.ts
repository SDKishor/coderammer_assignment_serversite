import AppError from '../../errors/AppError'
import { IUser } from './user.interface'
import UserModel from './user.model'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import config from '../../config'
import jwt from 'jsonwebtoken'
import { generateToken } from '../../utils/jwt'

const createUser = async (user: IUser) => {
  const newUser = await UserModel.create([user])

  if (!newUser.length) {
    throw new AppError('Failed to create student', StatusCodes.BAD_REQUEST)
  }
  const result = {
    _id: newUser[0]._id,
    name: newUser[0].name,
    email: newUser[0].email,
    role: newUser[0].role,
    credit: newUser[0].credit,
  }
  return result
}

const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND)
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if (!isPasswordMatched) {
    throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED)
  }

  const token = generateToken(user._id.toString(), user.role)

  const accesstoken = token

  return {
    accessToken: accesstoken,
  }
}

const getUserCredit = async (id: string) => {
  const user = await UserModel.findById(id)

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND)
  }

  return user.credit
}

export const authService = {
  createUser,
  loginUser,
  getUserCredit,
}
