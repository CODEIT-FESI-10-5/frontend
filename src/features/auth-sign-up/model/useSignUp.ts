import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { requestSignup } from '@/entities/auth/api';
import { SignupRequestApi } from '@/entities/auth/model';
import { SignupSchema } from './sign-up.schema';

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupSchema) => {
      const requestData: SignupRequestApi = {
        nickname: data.name,
        email: data.email,
        password: data.password,
      };
      return requestSignup(requestData);
    },
    onSuccess: () => {
      router.push('/auth/login');
    },
    onError: (err) => {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    },
  });
}
