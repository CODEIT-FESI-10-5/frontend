import { AccountForm } from '@/widgets/account/ui';
import { AccountButton } from './AccountButton';

export default function AccountPage() {
  return (
    <div className="bg-surface-1 border-border-subtle flex h-auto w-616 flex-col gap-18 border-1 px-34 py-30">
      <h1 className="headline-medium text-text-white">계정 정보</h1>
      <AccountForm />
      <AccountButton type="logout" />
      <AccountButton type="delete" />
    </div>
  );
}
