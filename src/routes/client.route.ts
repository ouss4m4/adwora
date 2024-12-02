import { Router } from 'express'
import { collections } from '../db/services'
import Client from '../models/client.model'
import { ObjectId } from 'mongodb'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const clients = await collections.clients?.find({}).toArray()
    // res.json(clients).send()
    res.render('clients/list', { title: 'Clients Page', clients })
  } catch (error: any) {
    res.status(500).send(error?.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const newClient = req.body as Client
    const result = await collections.clients?.insertOne(newClient)

    if (result) {
      res.redirect('/clients')
    } else {
      res.status(500).send('Failed to create a new client.')
    }
  } catch (error: any) {
    console.error(error)
    res.status(400).send(error.message)
  }
})

router.get('/create', (req, res) => {
  res.render('clients/create', { title: 'Create Client' })
})

router.get('/delete/:id', async (req, res) => {
  try {
    const clientId = new ObjectId(req.params.id) // Convert string to ObjectId
    const result = await collections.clients?.deleteOne({ _id: clientId })
    // res.json(result)
    res.redirect('/clients')
  } catch (error) {
    res.send(error)
  }
})

export { router as clientRouter }
