import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IClient {
  name: string
  email: string
  phone: string
}

export interface IClientDocument extends IClient, Document {}
const ClientSchema = new Schema<IClientDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

// Create the Client model
const Client: Model<IClientDocument> = mongoose.model<IClientDocument>(
  'Client',
  ClientSchema
)

export default Client
