'use client';
import { useStudyStore } from '../model/useStudyStore';
import { useState } from 'react';
import { useGetStudyQuery } from '../model/useGetStudyQuery';
import { StudyItem } from '@/entities/study';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import DropDown from '../../../../../public/assets/dropdown.svg';

export default function StudyList() {
  const router = useRouter();
  const { currentStudyId, setStudyId } = useStudyStore();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useGetStudyQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  // 현재 스터디 저장
  const currentStudy =
    data.studyList.find((study: StudyItem) => study.id === currentStudyId) ||
    data.studyList[0];

  // dropdown
  const handleClick = (study: StudyItem) => {
    setStudyId(study.id);
    router.push(`/dashboard/${study.id}`);
    setIsOpen(false);
  };

  return (
    <section className="flex flex-col gap-14">
      <h2 className="text-text-secondary body-large">현재 스터디</h2>
      <div id="dropdown">
        <div
          className={clsx(
            'bg-surface-4 flex h-108 w-full items-center gap-12 p-16',
            isOpen && 'rounded-t-6',
            !isOpen && 'rounded-6',
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex h-full w-232 flex-col gap-12">
            <h3 className="text-text-primary body-large">
              {currentStudy?.title}
            </h3>
            <p className="text-text-primary label-large">
              {currentStudy?.description}
            </p>
          </div>
          <DropDown />
        </div>
        {isOpen && (
          <ul>
            {data.studyList
              .filter((study: StudyItem) => study.id !== currentStudy?.id)
              .map((study: StudyItem, idx, arr) => (
                <li
                  className={clsx(
                    'bg-surface-4 h-108 w-full p-16',
                    idx === arr.length - 1 && 'rounded-b-6',
                  )}
                  key={study.id}
                  onClick={() => handleClick(study)}
                >
                  <div className="flex h-full w-232 flex-col gap-12">
                    <h3 className="text-text-primary body-large">
                      {study.title}
                    </h3>
                    <p className="text-text-primary label-large">
                      {study.description}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
