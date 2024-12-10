import { Request, Response } from 'express'
import { validateCreateUserRequest } from '../../validators/user/createUser.validator'
import Client from '../../models/client.model'
import User from '../../models/user.model'
import { addWelcomeNewUserJob } from '../../Queue/email.q'

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { error, errors } = validateCreateUserRequest(req.body)

  if (error) {
    return res.json({ error: true, errors })
  }
  // validation passes , check if clientId exist
  const { clientId, name, email, phone } = req.body

  // Check if the email already exists
  const existingClient = await Client.findById(clientId)

  if (!existingClient) {
    return res.json({
      error: true,
      message: 'invalid client id',
    })
  }

  try {
    const newUser = new User({
      name,
      email,
      phone,
      clientId,
    })
    await newUser.save()

    return res.json({
      success: true,
    })
  } catch (error: any) {
    return res.json({
      error: true,
      message: 'unexpected error happened',
    })
  }
}
