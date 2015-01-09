
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

- `aws billing total` - the total amount charged by AWS so far this billing period
- `aws billing rolling monthly total` - rolling 30 day estimate of the total cost

and for each `product`, it will expose the following metric:

- `aws billing product total` - the total amount charged by AWS so far this billing period
- `aws billing product rolling monthly total` - rolling 30 day estimate of the total cost

![image](https://cloud.githubusercontent.com/assets/658544/5673633/d7c93a44-9753-11e4-9222-afc8a5601166.png)

## Quickstart

Here's a full example of a [Geckoboard](https://github.com/segmentio/geckoboard) dashboard showing your total AWS costs:

```js
var Metrics = require('metrics');
var billing = require('metrics-aws-billing');
var geckoboard = require('geckoboard')('api-key');

new Metrics()
  .every('1d', billing(accountId, key, secret, bucket, region))
  .use(function (metrics) {
    metrics.on('aws billing total', function (metric) {
      geckoboard(widget).number(metric.latest());
    });
  });
```

## License

MIT