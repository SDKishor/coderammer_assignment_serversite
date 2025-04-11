import { Schema } from 'mongoose'

export interface ITransaction {
  amount: number
  description: string
  status: 'pending' | 'approved' | 'rejected'
  user: Schema.Types.ObjectId
}
