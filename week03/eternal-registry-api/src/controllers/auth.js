const LocalStrategy = require('passport-local');
const passport = require('passport');
const createError = require('http-errors');
const db = require('../models');
const User = db.users;

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            id: user.id,
            username: user.username,
            picture: user.picture
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
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
)


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