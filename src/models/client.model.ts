import mongoose, { Schema, Document, Model } from 'mongoose'

// Define the Client interface for type safety
export interface IClient extends Document {
  name: string
  email: string
  phone: string
}

// Define the Client schema
const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
)

// Create the Client model
const Client: Model<IClient> = mongoose.model<IClient>('Client', ClientSchema)

export default Client
