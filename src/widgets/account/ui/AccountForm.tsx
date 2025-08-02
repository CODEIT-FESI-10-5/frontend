'use client';

import UpdateName from '@/features/update-account/ui/UpdateName';
import UpdatePassword from '@/features/update-account/ui/UpdatePassword';
import UpdateProfile from '@/features/update-account/ui/UpdateProfile';

export default function AccountForm() {
  return (
    <div className="bg-surface-2 border-border-subtle rounded-6 flex w-full flex-col border-1">
      <UpdateProfile />
      <UpdateName />
      <UpdatePassword />
    </div>
  );
}
