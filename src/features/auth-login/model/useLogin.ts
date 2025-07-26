import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginSchema, useProfileStore } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';

export function useLogin() {
  const router = useRouter();
  const setProfile = useProfileStore((state) => state.setProfile);

  return useMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    onSuccess: (res) => {
      const { userId, name, email, profileImage } = res.data;

      setProfile({ userId, name, email, profileImage });

      router.push('/');
    },
    onError: (err) => {
      console.error(err);
      alert('로그인에 실패했습니다.');
    },
  });
}
