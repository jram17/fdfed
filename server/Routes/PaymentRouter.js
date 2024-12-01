const express = require('express');
const PaymentController = require("../Controllers/PaymentController");

class PaymentRouter extends PaymentController {
    constructor() {
        super();
        this.route = express.Router();

        this.route.post('/create-subscription', this.createSubscription.bind(this));
        this.route.put('/update-subscription', this.updateSubscription.bind(this));
        this.route.delete('/cancel-subscription', this.deleteSubscription.bind(this));

    }
}

module.exports = new PaymentRouter().route;