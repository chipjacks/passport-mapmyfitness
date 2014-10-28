/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth2')
  , Profile = require('./profile')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The MapMyFitness authentication strategy authenticates requests by delegating to
 * MapMyFitness using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your MapMyFitness application's Client ID
 *   - `clientSecret`  your MapMyFitness application's Client Secret
 *   - `callbackURL`   URL to which MapMyFitness will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new MapMyFitnessStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/mapmyfitness/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.mapmyfitness.com/v7.0/oauth2/authorize/';
  options.tokenURL = options.tokenURL || 'https://oauth2-api.mapmyapi.com/v7.0/oauth2/access_token/';
  options.customHeaders = options.customHeaders || {};

 	if (!options.customHeaders['Api-Key']) {
  	options.customHeaders['Api-Key'] = options.clientID;
	}

  OAuth2Strategy.call(this, options, verify);
  this.name = 'mapmyfitness';
  this._userProfileURL = options.userProfileURL || 'https://oauth2-api.mapmyapi.com/v7.0/user/self/';
  this._oauth2.useAuthorizationHeaderforGET(true);
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from MapMyFitness.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `mapmyfitness`
 *   - `id`               the user's MapMyFitness ID
 *   - `username`         the user's MapMyFitness username
 *   - `displayName`      the user's full name
 *   - `emails`           the user's email addresses
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    var json;
		console.log('body: ' + body);
    
    if (err) {
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }
    
    try {
			console.error("is this on?" + body);
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }
    
    var profile = Profile.parse(json);
    profile.provider  = 'mapmyfitness';
    profile._raw = body;
    profile._json = json;
    
    done(null, profile);
  });
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
