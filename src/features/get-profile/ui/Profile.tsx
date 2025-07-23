'use client';
import Image from 'next/image';
import { useGetProfileQuery } from '@/features/get-profile/model';
import SettingIcon from '@/assets/profile-settings.svg';

export default function Profile() {
  const { isLoading, data, error } = useGetProfileQuery();
  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>오류발생</div>;
  return (
    <div className="bg-surface-4 rounded-6 flex h-79 w-full items-center gap-13 px-14 py-12">
      <Image
        src={data?.image ?? '/images/default-profile.png'}
        alt="profile"
        width={55}
        height={55}
        className="rounded-100"
      />
      <div className="h-43">
        <p className="title-small text-text-secondary">{data?.name}</p>
        <p className="label-small text-text-secondary max-w-170 truncate">
          {data?.email}
        </p>
      </div>
      <div className="ml-auto flex h-full w-full justify-start">
        <SettingIcon className="" />
      </div>
    </div>
  );
}
