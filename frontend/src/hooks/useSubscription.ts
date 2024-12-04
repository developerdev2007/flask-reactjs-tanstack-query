import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Subscription } from "../types/type";
import {
  addSubscription,
  endSubscription,
  fetchSubscriptions,
} from "../services/api";
import { extendSubscription } from "../services/subscriptionService";
import queryClient from "../react-query";

export const useSubscriptions = () => {
  // Query to fetch all subscriptions
  const {
    data: subscriptions,
    isLoading,
    isError,
  } = useQuery<Subscription[], Error>({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
  });

  // Query to fetch revenue data
  //   const { data: revenue, isLoading: isRevenueLoading } = useQuery<
  //     Revenue,
  //     Error
  //   >({
  //     queryKey: ["revenue"],
  //       queryFn: fetchRevenue,
  //   });

  // Mutation to add a new subscription
  const { mutate: createSubscription, isPending: isCreating } = useMutation({
    mutationFn: addSubscription,
    onSuccess: () => {
      // Invalidate subscriptions cache to refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  // Mutation to extend a subscription
  const { mutate: updateSubscription, isPending: isUpdating } = useMutation({
    mutationFn: extendSubscription,
    onSuccess: () => {
      // Invalidate subscriptions cache to refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  // Mutation to end a subscription
  const { mutate: terminateSubscription, isPending: isEnding } = useMutation({
    mutationFn: endSubscription,
    onSuccess: () => {
      // Invalidate subscriptions cache to refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });

  return {
    subscriptions,
    // revenue,
    isLoading,
    isError,
    // isRevenueLoading,
    createSubscription,
    updateSubscription,
    terminateSubscription,
    isCreating,
    isUpdating,
    isEnding,
  };
};
