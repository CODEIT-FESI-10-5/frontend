'use client';

import {
  UpdateName,
  UpdateProfile,
  UpdatePassword,
} from '@/features/update-account/ui';

export default function AccountForm() {
  return (
    <div className="bg-surface-2 border-border-subtle rounded-6 flex w-full flex-col border-1">
      <UpdateProfile />
      <UpdateName />
      <UpdatePassword />
    </div>
  );
}
