import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SignUpSchema } from '@/features/auth-sign-up/model';
import { requestSignUp } from '@/entities/auth/api';

export function useSignUp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpSchema) => requestSignUp(data),
    onSuccess: () => {
      router.push('/auth/login');
    },
    onError: (err) => {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    },
  });
}
