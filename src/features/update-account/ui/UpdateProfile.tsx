'use client';
import Image from 'next/image';
import UpdateButton from '@/features/update-account/ui/UpdateButton';
import DeleteIcon from '@/assets/icon-delete.svg';

export default function UpdateProfile() {
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
              <UpdateButton type="profile" isActive />
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
