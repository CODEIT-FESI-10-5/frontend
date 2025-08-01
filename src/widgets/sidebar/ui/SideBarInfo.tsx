'use client';
import { usePathname } from 'next/navigation';
import { CreateStudyButton } from '@/features/create-study/ui';
import { Profile } from '@/features/get-profile/ui';
import { JoinStudyButton } from '@/features/join-study/ui';
import Image from 'next/image';
import CloseIcon from '@/assets/icon-close.svg';
import { useDrawerStore } from './model';

export default function SideBarInfo() {
  const { close, isOpen } = useDrawerStore();

  const handleClick = () => {
    close();
    console.log(isOpen);
  };
  const pathname = usePathname() as string;
  const isNotePage = pathname.startsWith('/note');

  return (
    <div>
      <div className="mb-28 flex items-center justify-between">
        <Image src="/images/logo.png" alt="logo" width={115} height={28} />
        <CloseIcon className="h-26 w-26 xl:hidden" onClick={handleClick} />
      </div>
      {isNotePage ? <NoteInfo /> : <ProfileInfo />}
    </div>
  );
}

function ProfileInfo() {
  return (
    <div>
      <Profile />
      <div className="mt-24 flex justify-between">
        <CreateStudyButton />
        <JoinStudyButton />
      </div>
    </div>
  );
}

function NoteInfo() {
  return (
    <div className="flex flex-col">
      <h1 className="text-text-white headline-medium">노트 모아보기 페이지</h1>
      <p className="text-text-primary label-medium">
        작성한 노트를 모아볼 수 있습니다.
      </p>
    </div>
  );
}
