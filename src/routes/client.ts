import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('clients/list', { title: 'Clients Page' })
})

router.post('/', (req, res) => {
  const { name, email, phone } = req.body

  // Create a new client
  const newClient = {
    name,
    email,
    phone,
  }

  res.redirect('/clients')
})

router.get('/create', (req, res) => {
  res.render('clients/create', { title: 'Create Client' })
})

export { router as clientRouter }
