'use client';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import DeleteIcon from '@/assets/icon-delete.svg';
import { useState, useRef } from 'react';
import { useChangeProfile } from '../model';

export default function UpdateProfile() {
  const profileImg = localStorage.getItem('profileImg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState(
    profileImg ? profileImg : '/images/default-profile.png',
  );

  const { mutate: changeProfileImage } = useChangeProfile((newProfileUrl) => {
    setImageSrc(newProfileUrl);
  });

  // 이미지 업로드
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      changeProfileImage({
        profileImageAction: 'UPLOAD',
        newImageFile: file,
      });
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제
  const handleDeleteImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageSrc('/images/default-profile.png');
    changeProfileImage({
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
          />
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-12">
              <Button
                label="이미지 변경"
                size="xs"
                theme="primary"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              />
              <DeleteIcon
                onClick={handleDeleteImage}
                className="cursor-pointer"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg"
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
