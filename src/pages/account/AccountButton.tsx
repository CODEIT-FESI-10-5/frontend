import { cva } from 'class-variance-authority';

type AccountButtonType = 'logout' | 'delete';

interface TypeMapEntry {
  label: string;
  action: () => void;
}

const typeMap: Record<AccountButtonType, TypeMapEntry> = {
  logout: {
    label: '로그아웃',
    action: () => {},
  },
  delete: {
    label: '회원탈퇴',
    action: () => {},
  },
};

interface AccountButtonProps {
  type: 'logout' | 'delete';
}

export const accountButtonVariants = cva('rounded-6 h-55 w-full', {
  variants: {
    variant: {
      logout: 'bg-surface-2 text-text-secondary border-1 border-border-subtle',
      delete: 'bg-surface-1 text-highlight label-small',
    },
  },
});

export function AccountButton({ type }: AccountButtonProps) {
  const { label } = typeMap[type];
  return (
    <button className={accountButtonVariants({ variant: type })}>
      {label}
    </button>
  );
}
