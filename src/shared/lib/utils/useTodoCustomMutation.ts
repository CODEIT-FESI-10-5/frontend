import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTodoCustomMutation = <TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  invalidateQueryKey: Array<string>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invalidateQueryKey,
      });
    },
  });
};
