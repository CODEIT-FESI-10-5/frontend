import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';
import { useStudyStore } from '@/features/get-study-list/model';
import { useGoalStore } from '@/features/get-goal-list/model';

// {
//     "httpStatusCode": 200,
//     "data": {
//         "email": "sdc9787@qwer.com",
//         "nickname": "sdc9787",
//         "profileImg": ""
//     }
// }

export function useLogin() {
  const router = useRouter();
  const { currentStudyId } = useStudyStore();
  const { getLastVisitedGoalId } = useGoalStore();
  // const setProfile = useProfileStore((state) => state.setProfile);

  return useMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    onSuccess: (res) => {
      //localStorage에 email, nickname, profileImg 저장
      const { email, nickname, profileImg } = res.data;
      localStorage.setItem('email', email);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('profileImg', profileImg);
      const goalId = getLastVisitedGoalId(currentStudyId);
      if (currentStudyId != null && goalId != null) {
        console.log(currentStudyId, goalId);
        router.push(`/dashboard/study/${currentStudyId}/goal/${goalId}`);
      } else {
        router.push('/');
      }
    },
    onError: (err) => {
      console.error(err);
      alert('로그인에 실패했습니다.');
    },
  });
}
