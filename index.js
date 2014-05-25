
var debug = require('debug')('metrics:aws-billing');
var Billing = require('aws-billing');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Create a new aws billing plugin.
 *
 * @param {String} accountId
 * @param {String} key
 * @param {String} secret
 * @param {String} bucket
 * @param {String} region
 */

function plugin (accountId, key, secret, bucket, region) {
  var billing = Billing(accountId, key, secret, bucket, region);
  return function awsBilling (metrics) {
    debug('querying aws billing ..');
    billing(function (err, costs) {
      if (err) return debug('failed to query aws billing: %s', err);
      debug('succesfully queried aws billing');
      metrics.set('aws billing ec2', costs.ec2);
      metrics.set('aws billing nonEc2', costs.nonEc2);
      metrics.set('aws billing total', costs.total);
    });
  };
}
