import jwt from 'jsonwebtoken'

export const generateToken = (id: string, role: string, name: string) =>
  jwt.sign({ id, role, name }, process.env.JWT_SECRET as string, {
    expiresIn: '5d',
  })
