'use client';
import { useGetStudy } from '@/entities/study';
import { StudyGoalList } from '@/features/get-goal-list/ui';
import { useStudyStore } from '@/features/get-study-list/model';
import { StudyDropDown, CurrentStudy } from '@/features/get-study-list/ui';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SideBarNav() {
  const { currentStudyId, setStudyId, resetStudyId } = useStudyStore();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // 로컬 스토리지에 스터디 아이디 저장
  useEffect(() => {
    if (pathname?.startsWith('/dashboard') && params?.studyId) {
      setStudyId(String(params.studyId));
    } else {
      resetStudyId();
    }
  }, []);

  // 스터디 리스트 패치
  const { isLoading, data: studyData, error } = useGetStudy();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!studyData) return <div>스터디가 없습니다.</div>;

  // 드랍다운 오픈 여부
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // 현재 스터디 정보
  const currentStudy =
    studyData.studyList.find((study) => study.id == currentStudyId) ?? null;

  return (
    <div>
      <CurrentStudy
        onClick={handleClick}
        isOpen={isOpen}
        currentStudy={currentStudy}
      />

      {/* StudyDropDown */}
      <div className={isOpen ? '' : 'hidden'}>
        <StudyDropDown onClick={handleClick} data={studyData} />
      </div>

      {/* StudyGoalList */}
      <div className={isOpen ? 'hidden' : ''}>
        <StudyGoalList studyId={currentStudyId} />
      </div>
    </div>
  );
}
