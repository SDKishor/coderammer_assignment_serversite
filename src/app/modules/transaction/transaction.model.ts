import mongoose, { Model, Schema } from 'mongoose'
import { ITransaction } from './transaction.interface'

const transactionSchema = new Schema<ITransaction>(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be at least 0.01'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

const TransactionModel: Model<ITransaction> = mongoose.model<ITransaction>(
  'Transaction',
  transactionSchema,
)

export default TransactionModel
