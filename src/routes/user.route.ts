import { Router } from 'express'
import User, { IUser } from '../models/user.model'
import { createUser } from '../controllers/user/create.controller'

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
router.post('/', createUser)

export { router as userRouter }
