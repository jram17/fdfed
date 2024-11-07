const express = require('express');
const PaymentController = require("../Controllers/PaymentController");

class PaymentRouter extends PaymentController {
    constructor() {
        super();
        this.route = express.Router();

        this.route.post('/create-subscription', this.createSubscription.bind(this));
        this.route.post('/verify-subscription', this.verifyPayment.bind(this));

    }
}

module.exports = new PaymentRouter().route;