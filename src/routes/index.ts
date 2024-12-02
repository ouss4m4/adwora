import { Router } from 'express'
import { clientRouter } from './client'
import { userRouter } from './users'
const router = Router()

router.get('/', (req, res) => {
  res.redirect('/dashboard')
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard', { title: 'Dashboard | Adwora' })
})

router.use('/clients', clientRouter)
router.use('/users', userRouter)
export default router
