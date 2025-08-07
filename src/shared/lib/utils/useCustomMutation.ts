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

interface MutationContext {
  toastId?: string;
}

export const useCustomMutation = <TVariables, TResult, TError = ApiError>(
  args: UseCustomMutationArgs<TVariables, TResult, TError>,
) => {
  const queryClient = useQueryClient();
  const { startLoading, stopLoading } = useLoadingStore();
  const { mutationFn, invalidateQueryKeys, mutationOptions, successMessage } =
    args;

  // const pendingInvalidationRef = useRef<Array<
  //   Array<string | number | object>
  // > | null>(null);

  // isLoading이 false가 되면 pending된 invalidation 실행
  // useEffect(() => {
  //   if (!isLoading && pendingInvalidationRef.current) {
  //     pendingInvalidationRef.current.forEach((key) => {
  //       queryClient.invalidateQueries({ queryKey: key });
  //     });
  //     pendingInvalidationRef.current = null;
  //   }
  // }, [isLoading, queryClient]);

  return useMutation<TResult, TError, TVariables, MutationContext>({
    mutationFn,
    ...mutationOptions,
    onMutate: (variables) => {
      // 로딩 상태 시작
      startLoading();

      // 기존 onMutate가 있다면 실행
      if (mutationOptions?.onMutate) {
        mutationOptions.onMutate(variables);
      }

      if (successMessage) {
        const toastId = toast.loading('응답을 기다리는중...');
        return { toastId };
      }
    },
    onSuccess: (data, variables, context) => {
      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, context);
      }
      if (successMessage) {
        toast.success(successMessage, { id: context?.toastId });
      }
    },
    onError: (error: TError, variables, context) => {
      if (mutationOptions?.onError) {
        mutationOptions.onError(error, variables, context);
      }
      const errorMessage =
        (error as ApiError)?.body?.errorMessage ?? '알 수 없는 에러입니다';
      toast.error(errorMessage, { id: context?.toastId });
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

      // invalidateQueries를 pending 상태로 저장
      // if (invalidateQueryKeys) {
      // pendingInvalidationRef.current = invalidateQueryKeys;
      // }
    },
  });
};
