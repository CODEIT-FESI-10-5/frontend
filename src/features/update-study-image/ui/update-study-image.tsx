'use client';
import { useRef } from 'react';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import { useUpdateStudyImageMutation } from '../model/useUpdateStudyImageMutation';
import toast from 'react-hot-toast';
import SettingIcon from '@/assets/icon-Settings.svg';
import { useModal } from '@/shared/lib/utils/useModal';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils/cn';
import { useDeleteStudyMutation } from '@/features/delete-study';

interface UpdateStudyImageProps {
  studyId: string;
}

export default function UpdateStudyImage({ studyId }: UpdateStudyImageProps) {
  const { open, close } = useModal();
  const ImageMutation = useUpdateStudyImageMutation(studyId, close);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const settingIconRef = useRef<HTMLSpanElement>(null);
  const { role } = useStudyRoleStore();
  const userRole = role;
  // 이미지 변경 핸들러
  const handleImageChange = () => {
    if (!fileInputRef.current) return;
    const files = fileInputRef.current.files;
    if (!files || files.length === 0) return;
    const imageFile = files[0];
    const formData = new FormData();
    formData.append('image', imageFile);
    ImageMutation.mutate(formData);
  };

  // 배경 삭제 핸들러 (API 연동만 비워둠)
  const handleImageDelete = async () => {
    toast.error('아직 구현되지 않았습니다.');
    close(); // 모달 닫기
    // TODO: 배경 이미지 삭제 API 연동
  };

  const deleteStudyMutation = useDeleteStudyMutation(studyId);

  // 스터디 삭제 핸들러
  const handleStudyDelete = () => {
    deleteStudyMutation.mutate({ studyId });
    close(); // 모달 닫기
  };

  // 설정 모달 열기
  const handleSettingIconClick = () => {
    if (settingIconRef.current) {
      open(
        <SettingModal
          onChangeBg={() => fileInputRef.current?.click()}
          onDeleteBg={handleImageDelete}
          onStudyDelete={handleStudyDelete}
        />,
        settingIconRef,
        { top: 8, left: 0 },
      );
    }
  };

  if (!userRole) {
    return (
      <span
        className={cn('absolute top-10 right-10 z-10 flex items-center gap-4')}
      >
        <Link href="/note">
          <button
            className={cn(
              'text-text-primary flex items-center justify-center rounded-full border border-[#a9abb9]',
              'm-label-small px-8 py-4',
              'md:body-small md:px-10 md:py-6',
            )}
          >
            노트 모아보기
          </button>
        </Link>
      </span>
    );
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <span
        className={cn('absolute top-10 right-10 z-10 flex items-center gap-4')}
        ref={settingIconRef}
      >
        <Link href="/note">
          <button
            className={cn(
              'text-text-primary flex items-center justify-center rounded-full border border-[#a9abb9]',
              'm-label-small px-8 py-4',
              'md:body-small md:px-10 md:py-6',
            )}
          >
            노트 모아보기
          </button>
        </Link>
        <button
          onClick={handleSettingIconClick}
          className={cn(
            'p-2 transition-all duration-200 hover:cursor-pointer disabled:opacity-50',
          )}
          title="배경 이미지 설정"
        >
          <SettingIcon className={cn('', 'h-26 w-26', 'md:h-34 md:w-34')} />
        </button>
      </span>
    </>
  );
}

// 설정 모달 컴포넌트
function SettingModal({
  onChangeBg,
  onDeleteBg,
  onStudyDelete,
}: {
  onChangeBg: () => void;
  onDeleteBg: () => void;
  onStudyDelete: () => void;
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-[#d4d4d4] bg-white text-nowrap text-[#353535] shadow-lg',
      )}
    >
      <button
        className={cn(
          'cursor-pointer border-b px-30 py-14',
          'm-body-large',
          'body-medium',
        )}
        onClick={onChangeBg}
      >
        배경 변경
      </button>
      <button
        className={cn(
          'cursor-pointer border-b px-30 py-14',
          'm-body-large',
          'body-medium',
        )}
        onClick={onDeleteBg}
      >
        배경 삭제
      </button>
      <button
        className={cn(
          'text-highlight cursor-pointer px-30 py-14',
          'm-body-large',
          'body-medium',
        )}
        onClick={onStudyDelete}
      >
        스터디 삭제
      </button>
    </div>
  );
}
