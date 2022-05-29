import passport from 'passport';
import CryptoJS from 'crypto-js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';
import User from '../User/model';
import System from '../System/model';
import config from '../../config/config';

passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
            const plainUser = await User.findOne({ email }).populate('systemID');

            if (!plainUser) {
                return done(null, false, { message: 'User not found!' });
            }

            const populateQuery =
                plainUser.noSystem === 1
                    ? 'systemID'
                    : {
                          path: 'mainUser',
                          populate: {
                              path: 'systemID'
                          }
                      };

            const user = await User.populate(plainUser, populateQuery);

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
    'jwtUser',
    new JWTStrategy(
        {
            secretOrKey: config.secretKey,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true
        },
        async (req, token, done) => {
            try {
                const bytes = CryptoJS.AES.decrypt(token.user, config.secretKey);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                req.user = decryptedData;
                return done(null, decryptedData);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'jwtFace',
    new JWTStrategy(
        {
            secretOrKey: config.secretKey,
            jwtFromRequest: ExtractJWT.fromHeader('authorizationface'),
            passReqToCallback: true
        },
        async (req, token, done) => {
            try {
                const bytes = CryptoJS.AES.decrypt(token.face, config.secretKey);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                req.face = decryptedData;
                return done(null, null);
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    )
);

passport.use(
    'jwtFinger',
    new JWTStrategy(
        {
            secretOrKey: config.secretKey,
            jwtFromRequest: ExtractJWT.fromHeader('authorizationfinger'),
            passReqToCallback: true
        },
        async (req, token, done) => {
            try {
                const bytes = CryptoJS.AES.decrypt(token.finger, config.secretKey);
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                req.finger = decryptedData;
                return done(null, null);
            } catch (error) {
                console.log(error);
                done(error);
            }
        }
    )
);

export const checkSystem = async (systemID) => {
    const existingSystem = await System.findOne({ systemID });

    return existingSystem;
};

export const checkUsers = async (systemID) => {
    const system = await System.findOne({ systemID });
    const existingUsers = await User.find({ systemID: system._id })
        .sort([['noSystem', -1]])
        .populate('systemID');

    return existingUsers;
};

export default passport;
