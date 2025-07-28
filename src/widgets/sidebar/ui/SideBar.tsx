'use client';
import { StudyGoalList } from '@/features/get-goal-list/ui';
import { StudyDropDown, StudyList } from '@/features/get-study-list/ui';
import SideBarInfo from '@/widgets/sidebar/ui/SideBarInfo';
import Image from 'next/image';
import { useState } from 'react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-surface-2 fixed top-0 bottom-0 left-0 flex w-348 flex-col gap-64 p-26">
      <div>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={115}
          height={28}
          className="mb-28"
        />
        <SideBarInfo />
      </div>
      <div className="flex flex-col gap-16">
        <StudyList onClick={handleClick} isOpen={isOpen} />
        {isOpen && <StudyDropDown onClick={handleClick} />}
      </div>
      {!isOpen && <StudyGoalList />}
    </div>
  );
}
