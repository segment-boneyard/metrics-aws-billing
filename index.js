
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
    billing(function (err, invoice) {
      if (err) return debug('failed to query aws billing: %s', err);
      debug('succesfully queried aws billing');
      var fraction = new Date().getDate() / 30; // monthly fraction
      metrics.set('aws billing total', invoice.total);
      metrics.set('aws billing estimated monthly total', invoice.total / fraction);
      Object.keys(invoice.products).forEach(function (product) {
        var cost = invoice.products[product];
        metrics.set('aws billing ' + product + ' total', cost);
        metrics.set('aws billing ' + product + ' estimated monthly total', cost / fraction);
      });
    });
  };
}