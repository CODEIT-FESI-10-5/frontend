'use client';
import Image from 'next/image';
import SettingIcon from '@/assets/profile-settings.svg';
import { useRouter } from 'next/navigation';
import { useDrawerStore } from '@/shared/model';

export default function Profile() {
  const { close } = useDrawerStore();
  const router = useRouter();

  const data: {
    email: string | null;
    nickname: string | null;
    profileImg: string | null;
  } = {
    email: localStorage.getItem('email'),
    nickname: localStorage.getItem('nickname'),
    profileImg: localStorage.getItem('profileImg'),
  };

  const handleClick = () => {
    close();
    router.push('/account');
  };

  return (
    <div className="bg-surface-4 rounded-6 flex h-79 w-full items-center gap-13 px-14 py-12">
      <Image
        src={
          data?.profileImg?.trim()
            ? data.profileImg
            : '/images/default-profile.png'
        }
        alt="profile"
        width={55}
        height={55}
        className="rounded-100"
      />
      <div className="h-43">
        <p className="title-small text-text-secondary">{data?.nickname}</p>
        <p className="label-small text-text-secondary max-w-170 truncate">
          {data?.email}
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
