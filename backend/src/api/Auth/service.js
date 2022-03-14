import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import User from '../User/model';
import System from '../System/model';
import config from '../../config/config';

passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email }).populate('mainUser systemID');

            if (!user) {
                return done(null, false, { message: 'User not found!' });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { message: 'Incorrect credentials!' });
            }

            return done(null, user, { message: 'Logged in successfully!' });
        } catch (error) {
            return done(error);
        }
    })
);

passport.use(
    new JWTStrategy(
        {
            secretOrKey: config.secretKey,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);

export const checkSystem = async (systemID) => {
    const existingSystem = await System.findOne({ systemID });
    const existingUser = await User.findOne({ systemID: existingSystem._id }).populate('systemID');

    return !existingUser && existingSystem;
};

export default passport;
