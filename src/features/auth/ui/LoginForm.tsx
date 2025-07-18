'use client';
import SubmitButton from '@/shared/ui/SubmitButton';
import TextField from '@/shared/ui/TextField';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  return (
    <div>
      <form className="flex flex-col gap-60">
        <div className="flex flex-col gap-30">
          <TextField
            label="이메일"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <SubmitButton name="로그인" type="submit" />
      </form>
      <div className="mt-24 flex items-start justify-center">
        <p className="text-text-tertiary label-medium">
          아직 회원이 아닌가요?{' '}
          <button
            type="button"
            className="text-text-secondary label-medium underline"
            onClick={() => router.push('/signup')}
          >
            회원가입하기
          </button>
        </p>
      </div>
    </div>
  );
}
