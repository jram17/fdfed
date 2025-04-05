import { getAllSubscriptions } from "../../../utils/AdminDashUtils";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
const SubscriptionDetails = () => {
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await getAllSubscriptions();
        console.log(response);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);
  return <div></div>;
};

export default SubscriptionDetails;
