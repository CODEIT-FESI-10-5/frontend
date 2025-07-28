'use client';
import { useRef } from 'react';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import { updateStudyImage } from '../api';
import toast from 'react-hot-toast';
import SettingIcon from '@/assets/icon-Settings.svg';
import { useModal } from '@/shared/lib/utils/useModal';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface UpdateStudyImageProps {
  studyId: string;
}

export default function UpdateStudyImage({ studyId }: UpdateStudyImageProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const settingIconRef = useRef<HTMLSpanElement>(null);
  const { open, close } = useModal();
  const { role } = useStudyRoleStore();
  const userRole = role;
  const params = useParams();
  const goalId = Array.isArray(params?.goalId)
    ? params.goalId[0]
    : params?.goalId;
  // 이미지 변경 핸들러
  const handleImageChange = async () => {
    if (!fileInputRef.current) return;
    const files = fileInputRef.current.files;
    if (!files || files.length === 0) return;
    const imageFile = files[0];
    // FormData로 이미지 전송
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      await updateStudyImage(studyId, formData);
      toast.success('이미지가 업데이트되었습니다!');
      close(); // 모달 닫기
      // 성공 후 추가 처리(예: 알림, 이미지 미리보기 등)
    } catch (err) {
      // 에러 처리
      console.error(err);
      toast.error('이미지 업데이트에 실패했습니다.');
    }
  };

  // 배경 삭제 핸들러 (API 연동만 비워둠)
  const handleImageDelete = async () => {
    toast.error('아직 구현되지 않았습니다.');
    close(); // 모달 닫기
    // TODO: 배경 이미지 삭제 API 연동
  };

  // 설정 모달 열기
  const handleSettingIconClick = () => {
    if (settingIconRef.current) {
      open(
        <SettingModal
          onChangeBg={() => fileInputRef.current?.click()}
          onDeleteBg={handleImageDelete}
        />,
        settingIconRef,
        { top: 8, left: 0 },
      );
    }
  };

  if (userRole !== 'LEADER') {
    return (
      <span className="absolute top-10 right-10 z-10 flex items-center gap-4">
        <Link href={goalId ? `/note/${goalId}` : '/note'}>
          <button className="body-small text-text-primary flex items-center justify-center rounded-full border border-[#a9abb9] px-10 py-6">
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
        className="absolute top-10 right-10 z-10 flex items-center gap-4"
        ref={settingIconRef}
      >
        <Link href={goalId ? `/note/${goalId}` : '/note'}>
          <button className="body-small text-text-primary flex items-center justify-center rounded-full border border-[#a9abb9] px-10 py-6">
            노트 모아보기
          </button>
        </Link>
        <button
          onClick={handleSettingIconClick}
          className="p-2 transition-all duration-200 hover:cursor-pointer disabled:opacity-50"
          title="배경 이미지 설정"
        >
          <SettingIcon />
        </button>
      </span>
    </>
  );
}

// 설정 모달 컴포넌트
function SettingModal({
  onChangeBg,
  onDeleteBg,
}: {
  onChangeBg: () => void;
  onDeleteBg: () => void;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-[#d4d4d4] bg-white text-nowrap text-[#353535] shadow-lg">
      <button
        className="body-medium cursor-pointer border-b px-30 py-14"
        onClick={onChangeBg}
      >
        배경 변경
      </button>
      <button
        className="body-medium cursor-pointer px-30 py-14"
        onClick={onDeleteBg}
      >
        배경 삭제
      </button>
    </div>
  );
}
