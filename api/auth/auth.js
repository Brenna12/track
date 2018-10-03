const passport = require('passport');
const request = require('request');
const CustomStrategy = require('passport-custom');
const config = require('../db/config.js').get(process.env.NODE_ENV);

passport.use('gen4-passport', new CustomStrategy(
    function (req, done) {

        if (!req.headers.authorization || req.headers.authorization === undefined) {
            return done(null, false);
        } else {

            let auth = req.headers.authorization;
            let token = auth.split(' ');
            let user = {};

            request.get(config.authentication.tokenInfo + '?access_token=' + token[1], function (error, response, body) {


                if (!error && response.statusCode == 200) {

                    let json = JSON.parse(body);

                    let user = json.audience;

                    return done(null, user);

                }

                if (!error && response.statusCode == 401) {
                    console.log(response)

                    return done(null, false);

                }

                if (error) {

                    console.log(error)
                    return done(null, false);
                }




            });


        }


    }
));


module.exports = function (req, res, next) {

    passport.authenticate('gen4-passport', {
        session: false
    }, function (err, user, info) {

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.sendStatus(401)
        }

        req.user = user; // Forward user information to the next middleware

        next();

    })(req, res, next);
}