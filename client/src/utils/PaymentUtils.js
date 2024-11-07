import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import axios from "axios";

const createSubscription = async (paymentBody) => {
    try {
        const response = await axios.post('http://localhost:3000/payment/create-subscription', paymentBody, {
            withCredentials: true,

        });
        if (response.statusCode === 200) {
            return {
                status: true,
                subscriptionDetails: response.data
            }
        }
    } catch (error) {
        console.error(error);
        return {
            status: false,
            subscriptionDetails: null
        }
    }

}

const verifyPayment = async (paymentBody) => {
    try {
        const response = await axios.post('http://localhost:3000/payment/verify-subscription', paymentBody, {
            withCredentials: true,
        });
        if (response.statusCode === 200) {
            return {
                paymentVerification: true,
            }
        }
    } catch (error) {
        console.error(error);
        return {
            paymentVerification: false,
        }

    }
}

export { createSubscription, verifyPayment };