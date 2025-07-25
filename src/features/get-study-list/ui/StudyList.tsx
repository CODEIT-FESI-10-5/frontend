'use client';
import { useStudyStore } from '@/features/get-study-list/model';
import { useGetStudy } from '@/features/get-study-list/model';
import { StudyItem } from '@/entities/study';
import DropDownIcon from '@/assets/dropdown.svg';
import DropUpIcon from '@/assets/dropup.svg';
import { cn } from '@/shared/utils/cn';

interface StudyListProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function StudyList({ isOpen, onClick }: StudyListProps) {
  const { currentStudyId } = useStudyStore();
  const { isLoading, data, error } = useGetStudy();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  // 현재 스터디 저장
  const currentStudy =
    data.studyList.find((study: StudyItem) => study.id === currentStudyId) ||
    data.studyList[0];

  return (
    <section className="flex flex-col gap-14">
      <h2 className="text-text-secondary title-small">현재 스터디</h2>

      <div
        onClick={onClick}
        className={cn(
          'bg-surface-4 rounded-6 border-border-default flex h-108 w-full items-center gap-12 border-1 p-16',
          isOpen && 'border-primary border-1',
        )}
      >
        <div className="flex h-full w-232 flex-col gap-12">
          <h3 className="text-text-secondary title-small">
            {currentStudy?.title}
          </h3>
          <p className="text-text-secondary label-small">
            {currentStudy?.description}
          </p>
        </div>
        {isOpen ? <DropUpIcon /> : <DropDownIcon />}
      </div>
    </section>
  );
}
