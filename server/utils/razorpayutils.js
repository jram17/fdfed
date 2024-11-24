const Razorpay = require('razorpay')
const env_variables = require("../utils/envutils")
const plans = require("../constants/razorpayconstants")
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');
class RazorpayPayment {
    razorpay_instance = null;
    constructor() {
        this.razorpay_instance = new Razorpay({
            key_id: env_variables.RAZORPAY_KEY_ID,
            key_secret: env_variables.RAZORPAY_SECRET_KEY,
            currency: 'INR',

        })
    }
    async CurrentTime() {
        try {
            const currentTime = Math.floor(Date.now() / 1000);
            return currentTime;
        } catch (error) {
            console.error('Failed to get current time:', error);
            throw new Error('Unable to fetch current time.');
        }
    }
    async createRazorpaySubscription(subdetails) {
        try {
            const plan_id = subdetails.sub_type === 'Basic' ? plans.basic.plan_id : plans.premium.plan_id;

            return this.razorpay_instance.subscriptions.create({
                plan_id: plan_id,
                customer_notify: 1,
                quantity: 1,
                total_count: 1,
                start_at: this.CurrentTime(),
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

    async cancelRazorpaySubscription(subscriptionId, options) {
        try {
            return this.razorpay_instance.subscriptions.cancel(subscriptionId, options);

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