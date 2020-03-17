var { mysql_connect, mysql_query, mysql_table_names, mysql_info_tables } = require('../mysql');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    { passReqToCallback: true },
    async function (req, username, password, done) {
        var user = await mysql_query("CALL Login (" + username + ", '" + password + "', '" + req.params.type + "')");
        return done(null, user && user[0] ? user[0][0] : null);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

function auth(req, res, next) {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                reject(err);
            }

            if (!user) {
                reject({ err: "Username or password is incorrect!" });
            }

            req.logIn(user, (err) => {
                if (err) {
                    reject(err);
                }

                resolve(user);
            });
        })(req, res, next);
    });
}

module.exports = { auth, passport };