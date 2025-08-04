'use client';
import Image from 'next/image';
import { Button } from '@/shared/ui';
import DeleteIcon from '@/assets/icon-delete.svg';
import { useState } from 'react';

export default function UpdateProfile() {
  const [isActive] = useState(false);
  //active function import 예정
  return (
    <div>
      <section className="flex flex-col gap-16 px-28 py-30">
        <h2 className="text-text-white body-medium">프로필 정보</h2>
        <div className="flex items-center gap-16">
          <Image
            src="/images/default-profile.png"
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
                isActive={isActive}
                theme="primary"
                type="submit"
              />
              <DeleteIcon />
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
