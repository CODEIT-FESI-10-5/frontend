'use client';
import { useRef } from 'react';
import { updateStudyImage } from '../api';

export default function UpdateStudyImage({ studyId }: { studyId: string }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      // 성공 후 추가 처리(예: 알림, 이미지 미리보기 등)
    } catch (err) {
      // 에러 처리
      console.error(err);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute top-10 right-10 z-10 p-2 transition-all duration-200 hover:cursor-pointer disabled:opacity-50"
        title="배경 이미지 변경"
      >
        <div className="flex flex-col items-center justify-center">
          <span>이미지</span>
          <span>변경</span>
        </div>
      </button>
    </>
  );
}
