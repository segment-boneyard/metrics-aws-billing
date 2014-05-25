
# metrics-aws-billing

An [aws-billing](https://github.com/segmentio/aws-billing) plugin for [segmentio/metrics](https://github.com/segmentio/metrics). 

Use this plugin to visualize your AWS hosting costs on a dashboard.

## Installation

    $ npm install metrics-aws-billing

## Example

```js
var Metrics = require('metrics');
var billing = require('metrics-aws-billing');

Metrics()
  .every('1d', billing(accountId, key, secret, bucket, region));
```

## Metrics

The metrics exposed by this plugin are:

- `aws billing ec2` - rolling 30 day estimate of ec2 costs
- `aws billing nonEc2` - rolling 30 day estimate of non-ec2 costs
- `aws billing total` - rolling 30 day estimate of AWS costs

## Quickstart

Here's a full example of a [Geckoboard](https://github.com/segmentio/geckoboard) dashboard showing your total AWS costs:

```js
var Metrics = require('metrics');
var billing = require('metrics-aws-billing');
var geckoboard = require('geckoboard')('api-key');

new Metrics()
  .every('1d', billing(accountId, key, secret, bucket, region))
  .use(function (metrics) {
    metrics.on('aws billing total', geckoboard('widget-id').number);
  });
```

## License

MIT