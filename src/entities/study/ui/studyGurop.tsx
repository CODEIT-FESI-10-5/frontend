'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useStudyGroup } from '@/entities/study/model/useStudyGroup';
import {
  updateStudyGroupInfo,
  updateStudyGroupImage,
} from '@/entities/study/api';

export default function StudyGroup({ studyId }: { studyId: string }) {
  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);

  const [title, setTitle] = useState(studyGroup?.title || '');
  const [description, setDescription] = useState(studyGroup?.description || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // studyGroup이 처음 로드될 때만 상태 초기화 (무한 루프 방지)
  useEffect(() => {
    if (studyGroup && !title && !description) {
      setTitle(studyGroup.title);
      setDescription(studyGroup.description);
    }
  }, [studyGroup]);

  // debounced API 호출 함수
  const debouncedUpdateInfo = (newTitle: string, newDescription: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (
        studyGroup &&
        (newTitle !== studyGroup.title ||
          newDescription !== studyGroup.description)
      ) {
        if (newTitle.trim() !== '' && newDescription.trim() !== '') {
          try {
            setIsUpdating(true);
            await updateStudyGroupInfo(studyId, newTitle, newDescription);
            console.log('스터디 정보가 성공적으로 업데이트되었습니다');
          } catch (error) {
            console.error('스터디 정보 업데이트 실패:', error);
            // 실패 시 원래 값으로 되돌리기
            if (studyGroup) {
              setTitle(studyGroup.title);
              setDescription(studyGroup.description);
            }
          } finally {
            setIsUpdating(false);
          }
        }
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

  // 배경 이미지 변경 핸들러
  const handleImageChange = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file && studyGroup) {
        try {
          setIsUpdating(true);

          // 파일을 Base64로 변환
          const reader = new FileReader();
          reader.onload = async (e) => {
            const base64String = e.target?.result as string;

            try {
              await updateStudyGroupImage(studyId, base64String);
              console.log('배경 이미지가 성공적으로 업데이트되었습니다');
            } catch (error) {
              console.error('배경 이미지 업데이트 실패:', error);
              alert('배경 이미지 업데이트에 실패했습니다.');
            } finally {
              setIsUpdating(false);
            }
          };

          reader.onerror = () => {
            alert('파일 읽기에 실패했습니다.');
            setIsUpdating(false);
          };

          reader.readAsDataURL(file);
        } catch (error) {
          console.error('파일 처리 실패:', error);
          alert('파일 처리에 실패했습니다.');
          setIsUpdating(false);
        }
      }
    };

    // 파일 선택 창 열기
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  // 에러 처리
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">
          에러 발생:{' '}
          {error instanceof Error ? error.message : '알 수 없는 에러'}
        </div>
      </div>
    );
  }

  // 스터디 그룹이 없을 경우 처리
  if (!studyGroup) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">스터디 그룹을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${studyGroup.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className="relative px-54 pt-44 pb-32 text-white"
    >
      {/* 배경 변경 버튼 텍스트로 변경*/}
      <button
        onClick={handleImageChange}
        disabled={isUpdating}
        className="bg-opacity-50 hover:bg-opacity-70 absolute top-10 right-10 z-10 rounded-full bg-black p-2 transition-all duration-200 disabled:opacity-50"
        title="배경 이미지 변경"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
            fill="white"
          />
        </svg>
      </button>

      {/* 컨텐츠 */}
      <div className="mb-35 flex flex-col gap-13">
        {/* 스터디 제목 (편집 가능) */}
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          disabled={isUpdating}
          className="headline-large w-full border-none bg-transparent placeholder-gray-300 outline-none disabled:opacity-50"
          placeholder="스터디 제목을 입력하세요..."
        />

        {/* 스터디 설명 (편집 가능) */}
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          disabled={isUpdating}
          className="label-large text-text-primary w-full resize-none border-none placeholder-gray-300 outline-none disabled:opacity-50"
          placeholder="스터디 목표나 응원 메세지를 적어주세요..."
          rows={1}
        />
      </div>
      {/*TODO Progress 바 max-w 어디까지 설정할지 */}
      <div className="mb-12 flex items-end justify-between">
        {/* 팀원 목록 */}
        <div className="flex items-center gap-8">
          {/* 겹치는 프로필 이미지들 */}
          <div className="flex -space-x-12">
            {studyGroup.members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="border-text-secondary h-32 w-32 overflow-hidden rounded-full border-2"
                style={{ zIndex: studyGroup.members.length + index }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {/* 추가 멤버가 있을 경우 +숫자 표시 */}
            {studyGroup.members.length > 4 && (
              <div className="border-text-secondary z-30 flex h-32 w-32 items-center justify-center rounded-full border-2 bg-gray-600">
                <span className="label-large text-white">
                  +{studyGroup.members.length - 4}
                </span>
              </div>
            )}
          </div>
          {/* 멤버 수 텍스트 */}
          <span className="text-text-primary label-small underline">
            {studyGroup.members.length}명 참여중
          </span>
        </div>
        {/* 팀원 진행도 % */}
        <div className="text-text-primary flex items-center justify-center gap-6 px-10">
          <span className="headline-small">{studyGroup.teamProgress}%</span>
          <span className="label-small">달성중</span>
        </div>
      </div>
      {/* Progress 바 */}
      {/* Progress Bar Container */}
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#e1e1e1] backdrop-blur-sm">
        {/* Animated Progress Fill */}
        <motion.div
          className="from-secondary to-primary h-full rounded-full bg-gradient-to-r shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${studyGroup.teamProgress}%` }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
      {/*초대 링크 */}
      <div className="bg-tertiary text-text-secondary absolute right-20 -bottom-26 flex gap-6 rounded-sm px-18 py-14">
        <span className="title-medium">초대 코드 {studyGroup.inviteLink}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.13653 17.3145C8.64766 17.3145 8.23387 17.1452 7.89516 16.8065C7.55645 16.4678 7.3871 16.054 7.3871 15.5651V4.54784C7.3871 4.05897 7.55645 3.64518 7.89516 3.30647C8.23387 2.96776 8.64766 2.7984 9.13653 2.7984H17.2506C17.7394 2.7984 18.1532 2.96776 18.4919 3.30647C18.8306 3.64518 19 4.05897 19 4.54784V15.5651C19 16.054 18.8306 16.4678 18.4919 16.8065C18.1532 17.1452 17.7394 17.3145 17.2506 17.3145H9.13653ZM9.13653 15.8629H17.2506C17.3251 15.8629 17.3933 15.8319 17.4552 15.7698C17.5173 15.7078 17.5484 15.6396 17.5484 15.5651V4.54784C17.5484 4.47332 17.5173 4.40509 17.4552 4.34316C17.3933 4.28106 17.3251 4.25001 17.2506 4.25001H9.13653C9.06202 4.25001 8.99379 4.28106 8.93185 4.34316C8.86976 4.40509 8.83871 4.47332 8.83871 4.54784V15.5651C8.83871 15.6396 8.86976 15.7078 8.93185 15.7698C8.99379 15.8319 9.06202 15.8629 9.13653 15.8629ZM5.74944 20.7016C5.26056 20.7016 4.84677 20.5323 4.50806 20.1936C4.16935 19.8549 4 19.4411 4 18.9522V6.48332H5.45161V18.9522C5.45161 19.0267 5.48266 19.0949 5.54476 19.1569C5.60669 19.219 5.67492 19.25 5.74944 19.25H15.3151V20.7016H5.74944Z"
            fill="#D5D5D5"
          />
        </svg>
      </div>
    </div>
  );
}
