# Passport-MapMyFitness

[Passport](http://passportjs.org/) strategy for authenticating with
[MapMyFitness](https://mapmyfitness.com/) using the OAuth 2.0 API.

This module lets you authenticate using MapMyFitness in your Node.js
applications.  By plugging into Passport, MapMyFitness authentication can be
easily and unobtrusively integrated into any application or framework that
supports [Connect](http://www.senchalabs.org/connect/)-style middleware,
including [Express](http://expressjs.com/).

## Install

    $ npm install passport-mapmyfitness

## Usage

#### Configure Strategy

The MapMyFitness authentication strategy authenticates users using a
MapMyFitness account and OAuth 2.0 tokens.  The strategy requires a `verify`
callback, which accepts these credentials and calls `done` providing a user, as
well as `options` specifying a client ID, client secret, and callback URL.

    passport.use(new MapMyFitnessStrategy({
        clientID: MAPMYFITNESS_CLIENT_ID,
        clientSecret: MAPMYFITNESS_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/mapmyfitness/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ mapmyfitnessId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'mapmyfitness'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/mapmyfitness',
      passport.authenticate('mapmyfitness'));

    app.get('/auth/mapmyfitness/callback', 
      passport.authenticate('mapmyfitness', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/chipjacks/passport-mapmyfitness/tree/master/examples/login).

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 Chip Jackson <[http://chipjacks.com/](http://chipjacks.com/)>
