import { AuthLayout } from '@/shared/ui';
import { LoginForm } from '@/features/auth-login/ui';
export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
