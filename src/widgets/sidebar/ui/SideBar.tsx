'use client';
import { StudyGoalList } from '@/features/get-goal-list/ui';
import { StudyDropDown, StudyList } from '@/features/get-study-list/ui';
import SideBarInfo from '@/widgets/sidebar/ui/SideBarInfo';
import { useState } from 'react';

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="bg-surface-2 fixed top-0 bottom-0 left-0 flex w-348 flex-col gap-64 p-26">
      <div>
        <img src="/images/logo.png" alt="logo" className="mb-28 h-28 w-115" />
        <SideBarInfo />
      </div>
      <div className="flex flex-col gap-16">
        <StudyList onClick={handleClick} isOpen={isOpen} />
        {isOpen && <StudyDropDown />}
      </div>
      {!isOpen && <StudyGoalList />}
    </div>
  );
}
