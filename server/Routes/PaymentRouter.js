const express = require('express');
const PaymentController = require("../Controllers/PaymentController");

class PaymentRouter extends PaymentController {
    constructor() {
        super();
        this.route = express.Router();

        this.route.post('/create-subscription', this.createSubscription.bind(this));

    }
}

module.exports = new PaymentRouter().route;