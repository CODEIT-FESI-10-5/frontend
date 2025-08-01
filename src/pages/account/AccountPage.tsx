import { AccountForm } from '@/widgets/account/ui';
import { AccountButton } from './AccountButton';
import { AppBar } from '@/shared/ui';

export default function AccountPage() {
  return (
    <div>
      {/* 데스크탑 UI */}
      <div className="bg-surface-1 border-border-subtle hidden h-auto w-screen flex-col gap-18 border-1 px-34 py-30 xl:flex xl:w-616">
        <h1 className="headline-medium text-text-white">계정 정보</h1>
        <AccountContents />
      </div>

      {/* 모바일 UI */}
      <div className="flex w-screen flex-col p-16 xl:hidden">
        <AppBar pageName="계정 정보" />
        <AccountContents />
      </div>
    </div>
  );
}

function AccountContents() {
  return (
    <div className="flex flex-col gap-18">
      <AccountForm />
      <AccountButton type="logout" />
      <AccountButton type="delete" />
    </div>
  );
}
