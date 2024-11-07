const Razorpay = require('razorpay')


class RazorpayPayment {
    razorpay_instance = null;
    constructor() {
        this.razorpay_instance = new Razorpay({
            key_id: 'YOUR_KEY_ID',
            key_secret: 'YOUR_KEY_SECRET',
            currency: 'INR',

        })
    }

    async createSubscription() {
        try {
            return this.razorpay_instance.subscriptions.create({
                plan_id: "plan_7wAosPWtrkhqZw",
                customer_notify: 1,
                quantity: 5,
                total_count: 6,
                start_at: 1495995837,
                addons: [
                    {
                        item: {
                            name: "Delivery charges",
                            amount: 30000,
                            currency: "INR"
                        }
                    }
                ],
                notes: {
                    key1: "value3",
                    key2: "value2"
                }
            })
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create subscription: ');

        }




    }

    async cancelSubscription(subscriptionId, options) {
        try {
            return this.razorpay_instance.subscriptions.cancel(subscriptionId, options)

        } catch (error) {
            console.error(error);
            throw new Error('Failed to cancel subscription: ');

        }




    }
    async updateSubscription(subscriptionId, options) {
        try {
            return this.razorpay_instance.subscriptions.update(subscriptionId, options);
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update subscription: ');

        }
    }
}

module.exports = RazorpayPayment;