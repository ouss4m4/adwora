import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.render('users/list', { title: 'Users' })
})

router.post('/', (req, res) => {
  const { name, email, phone } = req.body

  // Create a new client
  const newClient = {
    name,
    email,
    phone,
  }

  res.redirect('/users')
})

router.get('/create', (req, res) => {
  res.render('users/create', { title: 'Create User' })
})

export { router as userRouter }
