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
    const user = jwt.verify(token, JWT_SECRET) as { email: string }
    ;(req as any).user = user // Attach user details to the request object
    next()
  } catch {
    res.clearCookie('authToken')
    res.redirect('/auth/login')
  }
}
