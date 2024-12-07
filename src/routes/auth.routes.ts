import { Router } from 'express'
import {
  renderLoginPage,
  loginUser,
  logoutUser,
  renderSignupPage,
  signupUser,
} from '../controllers/auth.controller'

const authRouter = Router()

// Public Route
authRouter.get('/login', renderLoginPage)
authRouter.get('/signup', renderSignupPage)

authRouter.post('/login', loginUser)
authRouter.post('/signup', signupUser)

// Logout (Clears token)
authRouter.get('/logout', logoutUser)

export default authRouter
