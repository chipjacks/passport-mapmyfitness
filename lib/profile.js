/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  var profile = {};
  profile.id = String(json.id);
  profile.displayName = json.first_name + ' ' + json.last_name;
  profile.username = json.username;
  if (json.email) {
    profile.emails = [{ value: json.email }];
  }
  
  return profile;
};
