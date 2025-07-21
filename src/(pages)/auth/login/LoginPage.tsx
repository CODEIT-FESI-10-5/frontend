import { AuthLayout } from '@/features/auth-login/ui';
import { LoginForm } from '@/widgets/login/ui';
export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
