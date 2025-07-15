import jwt from 'jsonwebtoken'

export function generateToken(
  payload: jwt.JwtPayload,
  secret: string,
  expiresIn: string,
) {
  const token = jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions)
  return token
}

export function verifyToken(token: string, secret: string) {
  const verifiedToken = jwt.verify(token, secret) as jwt.JwtPayload
  return verifiedToken
}
