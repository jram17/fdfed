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

    async updateSubscription(req, res) {
        try {
            const options = {
                plan_id: req.body.plan_id,
            }
            await this.updateRazorPaySubscription(req.body.subscription_id, options);
            res.status(200).json({ message: 'Subscription updated successfully' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update subscription' });

        }
    }

    async deleteSubscription(req, res) {
        try {
            const { subscription_id } = req.body;
            await this.cancelRazorpaySubscription(subscription_id);
            res.status(200).json({ message: 'Subscription cancelled successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to cancel subscription' });

        }
    }


}

module.exports = PaymentController;