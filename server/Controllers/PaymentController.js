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

    async verifyPayment(req, res) {
        try {
            const isVerified = await this.verifySubscription(req.body);
            if (isVerified) {
                res.status(200).json({ message: 'Payment verified successfully' });
            } else {
                res.status(400).json({ message: 'Payment verification failed' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to verify subscription' });
        }
    }

}

module.exports = PaymentController;