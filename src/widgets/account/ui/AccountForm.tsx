import DeleteAccountButton from '@/features/delete-account/ui/DeleteAccountButton';
import LogoutButton from '@/features/logout/ui/LogoutButton';
import {
  UpdateNickname,
  UpdatePassword,
  UpdateProfile,
} from '@/features/update-account/ui';
import { Button } from '@/shared/ui';

export default function AccountForm() {
  return (
    <div className="flex flex-col gap-18">
      <div className="bg-surface-2 border-border-subtle rounded-6 flex w-full flex-col border-1">
        <UpdateProfile />
        <UpdateNickname />
        <UpdatePassword />
      </div>
      <LogoutButton />
      <DeleteAccountButton />
    </div>
  );
}
