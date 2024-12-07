import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // return next()
  const token = req.cookies.authToken

  if (!token) {
    return res.redirect('/login')
  }

  try {
    jwt.verify(token, JWT_SECRET) as { email: string }
    next()
  } catch {
    res.clearCookie('authToken')
    res.redirect('/login')
  }
}
