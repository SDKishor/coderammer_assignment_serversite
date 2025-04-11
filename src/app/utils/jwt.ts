import jwt from 'jsonwebtoken'

export const generateToken = (id: string, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET as string, { expiresIn: '1d' })

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string)
