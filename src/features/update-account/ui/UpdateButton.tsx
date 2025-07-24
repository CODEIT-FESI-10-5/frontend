import { cva, type VariantProps } from 'class-variance-authority';

type UpdateButtonType = 'profile' | 'nickname' | 'password';

interface TypeMapEntry {
  label: string;
  action: () => void;
}

const typeMap: Record<UpdateButtonType, TypeMapEntry> = {
  profile: {
    label: '이미지 변경',
    action: () => {},
  },
  nickname: {
    label: '닉네임 수정',
    action: () => {},
  },
  password: {
    label: '비밀번호 변경',
    action: () => {},
  },
};

interface UpdateButtonProps {
  type: UpdateButtonType;
  isActive: boolean;
}

export default function UpdateButton({ type, isActive }: UpdateButtonProps) {
  const { label, action } = typeMap[type];
  return (
    <button className="rounded-4 label-large text-text-primary bg-border-emphasis flex h-31 w-auto items-center justify-center px-12 py-6">
      {label}
    </button>
  );
}
