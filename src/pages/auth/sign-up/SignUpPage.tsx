import { SignUpForm } from '@/features/auth-sign-up/ui';

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-60">
      <div className="flex flex-col gap-12">
        <h1 className="text-text-white headline-large">Modudu 로그인</h1>
        <p className="text-text-secondary label-small">
          혼자보다 함께. 모두두로 팀과 스터디 상황을 공유하세요.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
