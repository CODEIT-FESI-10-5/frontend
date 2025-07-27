import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useTodoCustomMutation = <TVariables, TResult, TError = unknown>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  invalidateQueryKey?: Array<string>,
  mutationOptions?: UseMutationOptions<TResult, TError, TVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (invalidateQueryKey) {
        queryClient.invalidateQueries({
          queryKey: invalidateQueryKey,
        });
      }
      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
    },
  });
};
