import { connect } from 'mongoose'

export async function connectToDatabase() {
  try {
    await connect(process.env.DB_CONN_STRING ?? '')
    console.log('--DB Connected')
  } catch (error) {
    console.error(error)
  }
}
