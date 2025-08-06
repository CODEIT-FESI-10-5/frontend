import { ApiError } from '@/shared/api';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLoadingStore } from '@/shared/model/useLoadingStore';

interface UseCustomMutationArgs<TVariables, TResult, TError> {
  mutationFn: (variables: TVariables) => Promise<TResult>;
  invalidateQueryKeys?: Array<Array<string | number | object>>;
  mutationOptions?: UseMutationOptions<TResult, TError, TVariables>;
  successMessage?: string;
}

export const useCustomMutation = <TVariables, TResult, TError = ApiError>(
  args: UseCustomMutationArgs<TVariables, TResult, TError>,
) => {
  const queryClient = useQueryClient();
  const { startLoading, stopLoading } = useLoadingStore();
  const { mutationFn, invalidateQueryKeys, mutationOptions, successMessage } =
    args;

  return useMutation({
    mutationFn,
    ...mutationOptions,
    onMutate: (variables) => {
      // 로딩 상태 시작
      startLoading();

      // 기존 onMutate가 있다면 실행
      if (mutationOptions?.onMutate) {
        return mutationOptions.onMutate(variables);
      }
    },
    onSuccess: (data, variables, context) => {
      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
      if (successMessage) {
        toast.success(successMessage);
      }
    },
    onError: (error: TError, variables, context) => {
      if (mutationOptions?.onError) {
        mutationOptions.onError(error, variables, context);
      }
      const errorMessage =
        (error as ApiError)?.body?.errorMessage ?? '알 수 없는 에러입니다';
      toast.error(errorMessage);
    },
    onSettled: (data, error, variables, context) => {
      // 로딩 상태 종료
      stopLoading();

      if (mutationOptions?.onSettled) {
        mutationOptions.onSettled(data, error, variables, context);
      }
      if (invalidateQueryKeys) {
        invalidateQueryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },
  });
};
