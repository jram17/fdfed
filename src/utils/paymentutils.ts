import Razorpay from "razorpay";
import { plans } from "#/constants/paymentconstants";
import { createSubscription } from "#/types/payment/payment-type";
import { env } from "./envutils";
const razorpay_instance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_SECRET_KEY,
});
const createSubscription = async (subdetails: createSubscription) => {
  try {
    const plan_id =
      subdetails.sub_type === "BASIC"
        ? plans.basic.plan_id
        : plans.premium.plan_id;
    return razorpay_instance.subscriptions.create({
      plan_id: plan_id,
      customer_notify: 1,
      quantity: 1,
      total_count: 5,
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error("Failed to create subscription: " + error.message);
    } else {
      console.error("Unknown error:", error);
      throw new Error("Failed to create subscription due to an unknown error.");
    }
  }
};

const getSubscriptionDetails = async (subscriptionId: string) => {
  try {
    return razorpay_instance.subscriptions.fetch(subscriptionId);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error("Failed to create subscription: " + error.message);
    } else {
      // fallback for non-Error types
      console.error("Unknown error:", error);
      throw new Error("Failed to create subscription due to an unknown error.");
    }
  }
};

const getAllSubscriptionDetails = async () => {
  try {
    return razorpay_instance.subscriptions.all();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error("Failed to create subscription: " + error.message);
    } else {
      // fallback for non-Error types
      console.error("Unknown error:", error);
      throw new Error("Failed to create subscription due to an unknown error.");
    }
  }
};

export {
  getSubscriptionDetails,
  getAllSubscriptionDetails,
  createSubscription,
};
