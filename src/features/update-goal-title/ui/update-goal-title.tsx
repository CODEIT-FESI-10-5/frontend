'use client';

import { useEffect, useRef } from 'react';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import { useUpdateGoalTitleMutation } from '../model/useUpdateGoalTitleMutation';
import { useParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils/cn';
export default function EditGoalTitle(props: {
  title: string;
  setTitle: (newTitle: string) => void;
  goalId: string;
}) {
  const params = useParams();
  //studyId는 params에서 가져오고, goalId는 props에서 가져옵니다
  const studyId = Array.isArray(params?.studyId)
    ? params.studyId[0]
    : params?.studyId;

  const { title, setTitle, goalId } = props;

  const { role } = useStudyRoleStore();
  const userRole = role;

  // 디버깅용 콘솔 출력
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mutation = useUpdateGoalTitleMutation(
    Number(studyId),
    goalId,
    setTitle,
  );

  const debouncedUpdateTitle = (newTitle: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (newTitle !== title && newTitle.trim() !== '') {
        mutation.mutate(newTitle);
      }
    }, 2000);
  };

  // input 변경 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdateTitle(newTitle);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  {
    /* 스터디 목표 제목 수정 가능하게 input으로 구현 */
  }
  if (!userRole) {
    return (
      <span
        className={cn(
          'block w-full bg-transparent text-white',
          'm-headline-medium',
          'md:headline-large',
        )}
      >
        {title || '스터디 목표 없음'}
      </span>
    );
  }
  return (
    <input
      type="text"
      className={cn(
        'placeholeder:text-text-tertiary w-full bg-transparent text-white focus:outline-none',
        'm-headline-medium',
        'md:headline-large',
      )}
      value={title}
      onChange={handleTitleChange}
      placeholder="스터디 목표를 입력..."
    />
  );
}
