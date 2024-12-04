import { Router } from 'express'
import Client from '../models/client.model'

const router = Router()

/**
 * View Routes
 */

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().lean()
    res.render('clients/list', { title: 'Clients Page', clients })
  } catch (error: any) {
    res.status(500).send(error?.message)
  }
})

router.get('/create', (req, res) => {
  res.render('clients/create', { title: 'Create Client' })
})

router.get('/:id/edit', async (req, res): Promise<any> => {
  try {
    const client = await Client.findById(req.params.id)
    res.render('clients/edit', { title: 'Edit Client', data: client })
  } catch (error) {
    res.status(404)
  }
})

/**
 * CRUD Routes
 */
router.post('/', async (req, res): Promise<undefined> => {
  try {
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
      res.status(400).send('Name, email, and phone are required fields.')
      return
    }

    const newClient = new Client({
      name,
      email,
      phone,
    })

    const result = await newClient.save()

    if (result) {
      res.status(201).redirect('/clients')
    } else {
      res.status(500).send('Failed to create a new client.')
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

router.get('/delete/:id', async (req, res) => {
  try {
    const clientId = req.params.id

    // Find the client by id and delete
    const result = await Client.findByIdAndDelete(clientId)

    if (result) {
      // If deletion is successful, redirect or send a success response
      res.status(200).redirect('/clients') // Or redirect to another page, like '/clients'
    } else {
      // If no client found with the provided id
      res.status(404).send('Client not found.')
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).send('Failed to delete client.')
  }
})

router.patch('/:id', async (req, res): Promise<any> => {
  try {
    const clientId = req.params.id
    const updatedData = req.body

    const result = await Client.findByIdAndUpdate(clientId, updatedData, {
      new: true,
      runValidators: true,
    })
  } catch (error: any) {
    console.error(error)
  }
  res.status(201).redirect('/clients')
})

export { router as clientRouter }
