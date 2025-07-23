'use client';
import { StudyItem } from '@/entities/study/model/types';
import { useGetStudy, useStudyStore } from '../model';
import { useRouter } from 'next/navigation';

export default function StudyDropDown() {
  const router = useRouter();
  const { isLoading, data, error } = useGetStudy();
  const { setStudyId } = useStudyStore();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return <div>스터디가 없습니다.</div>;

  //스터디 클릭 시 해당 대시보드로 이동
  const handleClick = (study: StudyItem) => {
    setStudyId(study.id);
    router.push(`/dashboard/${study.id}`);
  };

  return (
    <div className="border-border-emphasis bg-surface-4 rounded-6 flex max-h-346 w-296 flex-col items-center justify-start gap-14 overflow-hidden border-1 px-13 py-8">
      {data &&
        data.studyList.map((study: StudyItem) => (
          <div
            key={study.id}
            onClick={() => handleClick(study)}
            className="flex h-98 min-h-98 w-full flex-col gap-12 px-11 py-8"
          >
            <h3 className="text-text-secondary title-small">{study.title}</h3>
            <p className="text-text-secondary label-small max-w-264">
              {study.description}
            </p>
          </div>
        ))}
    </div>
  );
}
