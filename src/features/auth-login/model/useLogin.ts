import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginSchema } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (err) => {
      console.error(err);
      alert('로그인에 실패했습니다.');
    },
  });
}
