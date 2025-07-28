import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

export const useTodoCustomMutation = <TVariables, TResult, TError = unknown>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  invalidateQueryKeys?: Array<Array<string>>,
  mutationOptions?: UseMutationOptions<TResult, TError, TVariables>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (invalidateQueryKeys) {
        invalidateQueryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
    },
  });
};
