const { WebpayPlus } = require('transbank-sdk');
WebpayPlus.configureForTestingWebpayPlus();
module.exports = { WebpayPlus };
