import { SignUpForm } from '@/features/auth-sign-up/ui';

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col gap-60">
      <div className="flex w-full flex-col gap-12">
        <h1 className="text-text-white title-medium md:headline-large">
          Modudu 회원가입
        </h1>
        <p className="text-text-secondary label-small">
          스터디원과 함께 성장할 준비 되셨나요?
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
