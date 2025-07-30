import { useMutation } from '@tanstack/react-query';
import { LoginSchema } from '@/features/auth-login';
import { requestLogin } from '@/entities/auth/api';
import { useRouter } from 'next/navigation';

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
  return useMutation({
    mutationFn: (data: LoginSchema) => requestLogin(data),
    onSuccess: (res) => {
      //localStorage에 email, nickname, profileImg 저장
      const { email, nickname, profileImg } = res.data;
      localStorage.setItem('email', email);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('profileImg', profileImg);
      router.replace('/dashboard');
    },
    onError: (err) => {
      console.error(err);
      alert('로그인에 실패했습니다.');
    },
  });
}
