const RazorpayPayment = require('../utils/rayzorpayutils.js')


class PaymentController extends RazorpayPayment {
    constructor() {
        super();
    }

    async createSubscription(req, res) {
        try {
            const { sub_type, total_count } = req.body;
            const subscription = await this.createSubscription({ sub_type, total_count });
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