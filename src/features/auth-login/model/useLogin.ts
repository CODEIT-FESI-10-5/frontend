'use client';

import { LoginSchema } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';
import { useRouter } from 'next/navigation';
import { useCustomMutation } from '@/shared/lib/utils/useCustomMutation';
import { useProfileStore } from '@/entities/profile/model';
import { useQueryClient } from '@tanstack/react-query';
import { studyQueryKeys } from '@/entities/study';
import { goalQueryKeys } from '@/entities/goal';
import { useStudyStore } from '@/features/get-study-list/model';
import { useGoalStore } from '@/features/get-goal-list/model';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { resetStudyId } = useStudyStore();
  const { resetGoalId } = useGoalStore();
  const { setProfile } = useProfileStore();
  return useCustomMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    mutationOptions: {
      onSuccess: (res) => {
        //localStorage에 email, nickname, profileImg 저장
        const { email, nickname, profileImg } = res.data;
        setProfile(nickname, email, profileImg);
        queryClient.resetQueries({ queryKey: studyQueryKeys.all });
        queryClient.resetQueries({ queryKey: goalQueryKeys.all });
        resetStudyId();
        resetGoalId();
        router.replace('/redirect');
      },
    },
  });
}
