'use client';

import { useRef, useState } from 'react';
import { updateStudyInfo } from '@/features/update-study-info/api';
import toast from 'react-hot-toast';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';

export default function UpdateStudyInfo(props: {
  title: string;
  description: string;
  studyId: string;
}) {
  const [title, setTitle] = useState<string>(props.title);
  const [description, setDescription] = useState<string>(props.description);
  const { role } = useStudyRoleStore();
  const userRole = role;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 2초 디바운스 함수
  const debouncedUpdateInfo = (newTitle: string, newDescription: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        await updateStudyInfo(props.studyId, newTitle, newDescription);
        toast.success('정보가 업데이트되었습니다!');
      } catch (error) {
        console.error('Error updating study info:', error);
        toast.error('업데이트에 실패했습니다.');
      }
    }, 2000);
  };

  // 제목 변경 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedUpdateInfo(newTitle, description);
  };

  // 설명 변경 핸들러
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    debouncedUpdateInfo(title, newDescription);
  };

  return (
    <div>
      {/* 컨텐츠 */}
      <div className="mb-35 flex flex-col gap-13">
        {/* 스터디 제목/설명: LEADER만 편집, 그 외는 span/div로 표시 */}
        {userRole === 'LEADER' ? (
          <>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="headline-large w-full border-none bg-transparent placeholder-gray-300 outline-none"
              placeholder="스터디 제목을 입력하세요..."
            />
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="label-small text-text-primary w-full resize-none border-none placeholder-gray-300 outline-none"
              placeholder="스터디 목표나 응원 메세지를 적어주세요..."
              rows={1}
            />
          </>
        ) : (
          <>
            <span className="headline-large block w-full bg-transparent text-white">
              {title || '스터디 제목 없음'}
            </span>
            <div className="label-small text-text-primary block w-full whitespace-pre-line">
              {description || '스터디 목표나 응원 메세지가 없습니다.'}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
