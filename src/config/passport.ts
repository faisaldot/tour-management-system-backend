import type { Profile, VerifyCallback } from 'passport-google-oauth20'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { UserModel } from '../modules/user/user.model'
import { Role } from '../modules/user/user.types'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0].value

        if (!email) {
          done(null, false, { message: 'No user found' })
        }

        let user = await UserModel.findOne({ email })

        if (!user) {
          user = await UserModel.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            isVerified: true,
            role: Role.USER,
            auths: [{
              provider: 'google',
              providerId: profile.id,
            }],
          })
        }

        return done(null, user)
      }
      catch (error) {
        console.log(error)
        done(error)
      }
    },
  ),
)

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await UserModel.findById(id)
    done(null, user)
  }
  catch (error) {
    console.log(error)
    done(error)
  }
})
