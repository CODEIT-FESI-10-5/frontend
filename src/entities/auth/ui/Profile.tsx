'use client';
import Image from 'next/image';
import SettingIcon from '@/assets/profile-settings.svg';
import { useRouter } from 'next/navigation';
import { useDrawerStore } from '@/shared/model';
import { useProfileStore } from '@/entities/profile/model';

export default function Profile() {
  const currentNickname = useProfileStore((state) => state.currentNickname);
  const currentEmail = useProfileStore((state) => state.currentEmail);
  const currentProfileImg = useProfileStore((state) => state.currentProfileImg);
  const { close } = useDrawerStore();
  const router = useRouter();

  const handleClick = () => {
    close();
    router.push('/account');
  };

  return (
    <div className="bg-surface-4 rounded-6 flex h-79 w-full items-center gap-13 px-14 py-12">
      <Image
        src={
          currentProfileImg?.trim()
            ? currentProfileImg
            : '/images/default-profile.png'
        }
        alt="profile"
        width={55}
        height={55}
        className="rounded-100"
      />
      <div className="h-43">
        <p className="title-small text-text-secondary">{currentNickname}</p>
        <p className="label-small text-text-secondary max-w-170 truncate">
          {currentEmail}
        </p>
      </div>
      <div className="ml-auto flex h-full w-full items-start justify-end">
        <button onClick={handleClick}>
          <SettingIcon />
        </button>
      </div>
    </div>
  );
}
