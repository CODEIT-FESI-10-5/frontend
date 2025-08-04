import { LoginForm } from '@/features/auth-login/ui';

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col gap-100 md:gap-60">
      <div className="flex w-full flex-col gap-12">
        <h1 className="text-text-white title-medium md:headline-large">
          Modudu 로그인
        </h1>
        <p className="text-text-secondary label-small">
          혼자보다 함께. 모두두로 팀과 스터디 상황을 공유하세요.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
