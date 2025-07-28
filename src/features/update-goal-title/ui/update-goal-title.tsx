'use client';

import { useEffect, useRef } from 'react';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import { updateGoalTitle } from '../api/updateGoalTitle';
import toast from 'react-hot-toast';
export default function EditGoalTitle(props: {
  title: string;
  setTitle: (newTitle: string) => void;
  goalId: string;
  studyId: string | number;
}) {
  const { title, setTitle, goalId, studyId } = props;
  const { getStudyRole } = useStudyRoleStore();
  const userRole = getStudyRole(Number(studyId));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdateTitle = (newTitle: string) => {
    // 이전 타이머가 있다면 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 새로운 타이머 설정 (1.5초 후 API 호출)
    timeoutRef.current = setTimeout(async () => {
      if (newTitle !== title && newTitle.trim() !== '') {
        try {
          await updateGoalTitle(goalId, newTitle);
          toast.success('제목이 업데이트되었습니다');
        } catch (error) {
          console.log(error);
          toast.error('제목 업데이트에 실패했습니다');
          // 실패 시 원래 제목으로 되돌리기
          setTitle(title);
        }
      }
    }, 2000); // 2초 debounce
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
  if (userRole !== 'LEADER') {
    return (
      <span className="headline-large block w-full bg-transparent text-white">
        {title || '스터디 목표 없음'}
      </span>
    );
  }
  return (
    <input
      type="text"
      className="headline-large placeholeder:text-text-tertiary w-full bg-transparent focus:outline-none"
      value={title}
      onChange={handleTitleChange}
      placeholder="스터디 목표를 입력..."
    />
  );
}
