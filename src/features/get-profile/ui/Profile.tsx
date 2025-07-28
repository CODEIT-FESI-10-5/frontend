'use client';
import Image from 'next/image';
import SettingIcon from '@/assets/profile-settings.svg';
import Link from 'next/link';

export default function Profile() {
  // const { isLoading, data, error } = useGetProfileQuery();
  // if (isLoading) return <div>로딩중</div>;
  // if (error) return <div>오류발생</div>;

  //   localStorage.setItem('email', email);
  // localStorage.setItem('nickname', nickname);
  // localStorage.setItem('profileImg', profileImg);
  //localstorage에서 프로필 정보 가져오기
  const data: {
    email: string | null;
    nickname: string | null;
    profileImg: string | null;
  } = {
    email: localStorage.getItem('email'),
    nickname: localStorage.getItem('nickname'),
    profileImg: localStorage.getItem('profileImg'),
  };

  return (
    <div className="bg-surface-4 rounded-6 flex h-79 w-full items-center gap-13 px-14 py-12">
      <Image
        src={data?.profileImg ? data.profileImg : '/images/default-profile.png'}
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
      <div className="ml-auto flex h-full w-full justify-end">
        <Link href="/account">
          <SettingIcon />
        </Link>
      </div>
    </div>
  );
}
