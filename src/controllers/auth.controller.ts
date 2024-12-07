import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { title } from 'process'
import User from '../models/user.model'

const JWT_SECRET = process.env.JWT_SECRET ?? 'your_jwt_secret_key' // Replace with a secure key

// VIEW ROUTES
export const renderLoginPage = (req: Request, res: Response) => {
  res.render('login', { title: 'Login | Adwora', layout: false, errors: {} })
}

export const renderSignupPage = (req: Request, res: Response) => {
  res.render('signup', { title: 'Signup | Adwora', layout: false, errors: {} })
}

// AUTH ROUTES
export const signupUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password, name } = req.body

  const existingUser = await User.findOne({ email })

  if (existingUser != null) {
    return res.render('signup', {
      title: 'Signup | Adwora',
      errors: {
        email: 'email already exist',
      },
      layout: false,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  let newUser = new User({
    clientId: '674fe6906fc18bd9694feda7',
    name,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.redirect('/login')
  } catch (error) {
    res.json(JSON.stringify(error))
  }
}

// Handle Login
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).send('Invalid email or password')
  }
  console.log('------------------')

  console.log(password)
  console.log('------------------')
  console.log(user)

  let passwordMatch = await bcrypt.compare(password, user.password)
  console.log(passwordMatch)
  console.log('------------------')

  if (!passwordMatch) {
    return res.status(400).send('Invalid email or password')
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })
  res.cookie('authToken', token, { httpOnly: true })
  res.redirect('/dashboard')
}

// Handle Logout
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie('authToken')
  res.redirect('/login')
}