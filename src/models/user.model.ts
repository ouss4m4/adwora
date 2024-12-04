import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser {
  name: string
  email: string
  phone?: string
  clientId: mongoose.Schema.Types.ObjectId // Reference to the Client model
}

interface IUserDocument extends IUser, Document {}
const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create the Client model
const User: Model<IUserDocument> = mongoose.model<IUserDocument>(
  'User',
  UserSchema
)

export default User
