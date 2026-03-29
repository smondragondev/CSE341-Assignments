const LocalStrategy = require('passport-local');
const GitHubStrategy = require('passport-github2');
const passport = require('passport');
const createError = require('http-errors');
const db = require('../models');
const User = db.users;
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, CALLBACK_URL } = require('../config/github.config');

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.email,
        });
    });
});

passport.deserializeUser(async function (sessionData, cb) {
    const user = await User.findById(sessionData.id);
    return cb(null, user);
});

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'Email not found' });
                }
                const isValid = await user.comparePassword(password);
                if (!isValid) {
                    return done(null, false, { message: 'Incorrected Credentials' });
                }
                return done(null, user);

            } catch (err) {
                done(err);
            }
        })
);

passport.use(
    'github',
    new GitHubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: CALLBACK_URL
    },
        async function (accessToken, refreshToken, profile, done) {
            console.log(`GITHUB PROFILE ${profile}`);
            let user = await User.findOne({githubId: profile.id});
            if (!user){
                user = await User.create({
                    githubId: profile.id,
                    email: profile.emails?.[0]?.value,
                    firstName: profile.displayName?.split(' ')[0] || 'name',
                    lastName: profile.displayName?.split(' ')[1] || 'user',
                    authProvider: 'github'
                })
            }
            return done(null, user);
        }
    ));


exports.loginPassword = async (req, res, next) => {
    /*  #swagger.tags = ['Auth']
        #swagger.summary = 'Authentication module'
        #swagger.description = 'It authenticate a user using email and password'
        #swagger.parameters['body'] = {
                in: 'body',
                description: 'Login using password',
                schema: { $ref: '#/definitions/LoginPassword' }
        }
    */
    try {
        passport.authenticate('local', async (err, user, info) => {
            console.log(`Err: ${err}`);
            console.log(`User: ${user}`);
            console.log(`Info: ${info}`);
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(createError.Unauthorized('Invalid credentials'));
            }
            req.login(user, async (error) => {
                if (error) {
                    return next(createError.InternalServerError("Ups! The login failed!"));
                }
                res.status(200).send({
                    message: "Login succesfull"
                })
            })
        })(req, res, next);
    } catch (err) {
        next(err)
    }
}

exports.loginGithub = async (req, res, next) => {
     /*  #swagger.tags = ['Auth']
        #swagger.summary = 'Login using OAUTH2 with Github'
        #swagger.description = 'Login using OAUTH2 with Github'
    */
    try {
        passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    } catch (err) {
        next(err);
    }
}

exports.githubCallback = async (req, res, next) => {
    /*  #swagger.tags = ['Auth']
        #swagger.summary = 'Callback for the OAUTH2 with Github'
        #swagger.description = 'Callback for the OAUTH2 with Github'
    */
    try {
        passport.authenticate('github', 
        async (err, user, info) => {
            console.log(`Err: ${err}`);
            console.log(`User: ${user}`);
            console.log(`Info: ${info}`);
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(createError.Unauthorized('Github authentication failed'));
            }
            req.login(user, async (error) => {
                if (error) {
                    return next(createError.InternalServerError("Ups! The login failed!"));
                }
                res.status(200).send({
                    message: "Github login succesful",
                    user: {
                        id: user.id,
                        email: user.email,
                    }
                })
            })
        }

        )(req, res, next);

    } catch (err) {
        next(err);
    }
}

exports.logout = async (req, res, next) => {
    /*  #swagger.tags = ['Auth']
        #swagger.summary = 'Logout the user'
        #swagger.description = 'Logout the user'
        */
    try {
        req.logout((err) => {
            if (err) throw createError.InternalServerError("An error ocurred while we logout");
            res.status(200).send({
                message: "Logout succesfull"
            })
        })
    } catch (err) {
        next(err)
    }
}