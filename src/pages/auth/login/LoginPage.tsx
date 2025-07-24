import { LoginForm } from '@/features/auth-login/ui';
import Image from 'next/image';
export default function LoginPage() {
  return (
    <div className="flex flex-col gap-60">
      <div className="flex flex-col gap-28">
        <Image src="/images/logo.png" width={153} height={36} alt="logo" />
        <div className="flex flex-col gap-12">
          <h1 className="text-text-white headline-large">Modudu 로그인</h1>
          <p className="text-text-secondary label-small">
            혼자보다 함께. 모두두로 팀과 스터디 상황을 공유하세요.
          </p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
