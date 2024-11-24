const RazorpayPayment = require('../utils/razorpayutils')


class PaymentController extends RazorpayPayment {
    constructor() {
        super();
    }

    async createSubscription(req, res) {
        try {
            const subscription = await this.createRazorpaySubscription(req.body);
            res.status(200).json({ subscription });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create subscription' });
        }
    }


}

module.exports = PaymentController;