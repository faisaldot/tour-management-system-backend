import type { Request, Response } from 'express'
import { Router } from 'express'
import passport from 'passport'
import checkAuth from '../../middlewares/check-auth'
import { Role } from '../user/user.types'
import { AuthController } from './auth.controller'

const authRoutes = Router()

authRoutes.post('/login', AuthController.credentialsLogin)
authRoutes.post('/refresh-token', AuthController.getNewAccessToken)
authRoutes.post('/logout', AuthController.logout)
authRoutes.post('/reset-password', checkAuth(...Object.values(Role)), AuthController.resetPassword)

authRoutes.get('/google', async (req: Request, res: Response) => {
  const redirect = req.query.redirect

  passport.authenticate('google', { scope: ['profile', 'email'], state: redirect as string })(req, res)
})

authRoutes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), AuthController.googleCallbackController)

export default authRoutes
