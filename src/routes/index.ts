import { Router } from 'express'
import { clientRouter } from './client.route'
import { userRouter } from './user.route'
import authRouter from './auth.routes'
import { authenticateJWT } from '../middlewares/auth.middleware'

const router = Router()

// Public Route
router.use(authRouter) // Login route is public

// Middleware to Protect Private Routes
router.use(authenticateJWT)

// Protected Routes
router.get('/', (req, res) => {
  res.redirect('/dashboard')
})

router.get('/dashboard', (req, res) => {
  const user = (req as any).user
  res.render('dashboard', { title: 'Dashboard | Adwora', user })
})

router.use('/clients', clientRouter)
router.use('/users', userRouter)

export default router
