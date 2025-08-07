'use client';
import { useGetStudy } from '@/entities/study';
import { useGoalStore } from '@/features/get-goal-list/model';
import { StudyGoalList } from '@/features/get-goal-list/ui';
import { useStudyStore } from '@/features/get-study-list/model';
import { StudyDropDown, CurrentStudy } from '@/features/get-study-list/ui';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SideBarNav() {
  const { setStudyId, currentStudyId } = useStudyStore();
  const { setGoalId, resetGoalId } = useGoalStore();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const studyId = params?.studyId ?? null;
  const goalId = params?.goalId ?? null;

  // 스터디 리스트 패치
  const { isLoading, data: studyData, error } = useGetStudy();

  // 대시보드 진입시 로컬 스토리지에 스터디, 목표 아이디 저장
  useEffect(() => {
    if (pathname?.startsWith('/dashboard') && studyId) {
      if (goalId) {
        setGoalId(String(goalId));
        setStudyId(String(studyId));
      } else {
        setStudyId(String(studyId));
        resetGoalId();
      }
    }
  }, [studyId, goalId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!studyData) return <div>스터디가 없습니다.</div>;

  // 드랍다운 오픈 여부
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // 현재 스터디 정보
  const currentStudy =
    studyData.studyList.find((study) => study.id == currentStudyId) ??
    (studyData.totalCount > 0 ? studyData.studyList[0] : null);

  return (
    <div>
      <CurrentStudy
        onClick={handleClick}
        isOpen={isOpen}
        currentStudy={currentStudy}
      />

      {/* StudyDropDown */}
      <div
        className={
          isOpen &&
          studyData.studyList.filter((study) => study.id !== currentStudyId)
            .length > 0
            ? ''
            : 'hidden'
        }
      >
        <StudyDropDown onClick={handleClick} data={studyData} />
      </div>

      {/* StudyGoalList */}
      <div
        className={
          isOpen &&
          studyData.studyList.filter((study) => study.id !== currentStudyId)
            .length > 0
            ? 'hidden'
            : ''
        }
      >
        <StudyGoalList />
      </div>
    </div>
  );
}
