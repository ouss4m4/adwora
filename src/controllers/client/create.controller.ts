import { Request, Response } from 'express'
import { validateCreateClientRequest } from '../../validators/client/createClient.validator'
import Client from '../../models/client.model'

export const createClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error, errors } = validateCreateClientRequest(req.body)

  if (error) {
    // THE OLD() DATA + ERROR STYLE
    return res.render('clients/create', { errors, oldData: req.body })
  }

  const { name, email, phone } = req.body

  // Check if the email already exists
  const existingClient = await Client.findOne({ email })
  if (existingClient) {
    return res.render('clients/create', {
      errors: { email: 'Email already exists.' },
      oldData: req.body,
    })
  }

  const newClient = new Client({
    name,
    email,
    phone,
  })
  try {
    const result = await newClient.save()

    res.redirect('/clients')
  } catch (error: any) {
    res.render('clients/create', {
      errors: { root: JSON.stringify(error) },
      oldData: req.body,
    })
  }
}
