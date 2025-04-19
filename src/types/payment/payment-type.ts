// Define a type
type SubscriptionType = 'BASIC' | 'PREMIUM';
type Plan = {
  plan_id: string;
  amount: string;
};

type Plans = {
  premium: Plan;
  basic: Plan;
};


export type createSubscription ={
        sub_type : SubscriptionType
}

