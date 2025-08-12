'use client';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import DeleteIcon from '@/assets/icon-delete.svg';
import { useState, useRef } from 'react';
import { useUpdateProfile } from '../model/useUpdateProfile';
import { useProfileStore } from '@/entities/profile/model';

export default function UpdateProfile() {
  const currentImage = useProfileStore((state) => state.currentProfileImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState(
    currentImage || '/images/default-profile.png',
  );
  const { mutate, isPending } = useUpdateProfile();

  // 이미지 업로드
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      mutate({
        profileImageAction: 'UPLOAD',
        newImageFile: file,
      });
    }
  };

  // 이미지 삭제
  const handleDeleteImage = () => {
    setImageSrc('/images/default-profile.png');
    mutate({
      profileImageAction: 'RESET',
    });
  };

  return (
    <div>
      <section className="flex flex-col gap-16 px-28 py-30">
        <h2 className="text-text-white body-medium">프로필 정보</h2>
        <div className="flex items-center gap-16">
          <Image
            src={imageSrc}
            width={70}
            height={70}
            alt="profile"
            className="rounded-100"
            onError={() => setImageSrc('/images/default-profile.png')}
          />
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-12">
              <Button
                label="이미지 변경"
                size="xs"
                theme="primary"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                isPending={isPending}
              />
              <DeleteIcon
                onClick={handleDeleteImage}
                className="h-24 w-24 cursor-pointer"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <p className="text-text-primary label-small">
              최소 00x00 사이즈, JPG, PNG
            </p>
          </div>
        </div>
      </section>
      <hr className="border-border-subtle border-1" />
    </div>
  );
}
