import { Router } from 'express'
import User, { IUser } from '../models/user.model'

const router = Router()

/**
 * View Routes
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('clientId').lean()

    res.render('users/list', { title: 'Users Page', users })
  } catch (error: any) {
    res.status(500).send(error?.message)
  }
})

router.get('/create', (req, res) => {
  res.render('users/create', { title: 'Create User' })
})

router.get('/:id/edit', async (req, res): Promise<any> => {
  try {
    const user = await User.findById(req.params.id)
    res.render('users/edit', { title: 'Edit Users', data: user })
  } catch (error) {
    res.status(404)
  }
})

/**
 * CRUD Routes
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, clientId } = req.body as IUser

    if (!name || !email) {
      res.status(400).send('Name and email are required fields.')
      return
    }

    const newUser = new User({
      name,
      email,
      phone,
      clientId,
    })

    const result = await newUser.save()

    if (result) {
      res.status(201).redirect('/users')
    } else {
      res.status(500).send('Failed to create a new user.')
    }
  } catch (error: any) {
    console.error(error)
    res.status(500).send(error.message)
  }
})

export { router as userRouter }
