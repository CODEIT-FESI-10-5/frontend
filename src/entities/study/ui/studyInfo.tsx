'use client';

import { motion } from 'framer-motion';
import type { StudyGroup } from '../model';
import CopyIcon from '@/assets/copy.svg';
import { useRef } from 'react';
import Image from 'next/image';
import { useModal } from '@/shared/lib/utils/useModal';
import toast from 'react-hot-toast';

export default function StudyInfo({
  members,
  teamProgress,
  inviteLink,
}: {
  members: StudyGroup['members'];
  teamProgress: StudyGroup['teamProgress'];
  inviteLink: StudyGroup['inviteLink'];
}) {
  const memberTextRef = useRef<HTMLSpanElement>(null);
  const { open } = useModal();

  const handleMemberTextClick = () => {
    if (memberTextRef.current && members.length > 0) {
      open(<ProfileModal members={members} />, memberTextRef, {
        top: 8,
        left: 0,
      });
    }
  };

  // 초대코드 복사 핸들러
  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success('초대 코드가 복사되었습니다!');
    } catch {
      // 복사 실패 시 별도 처리 가능
      toast.error('초대 코드 복사에 실패했습니다.');
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col">
        {/*TODO Progress 바 max-w 어디까지 설정할지 */}
        <div className="mb-12 flex items-end justify-between">
          {/* 팀원 목록 */}
          <div className="flex items-center gap-8">
            {/* 겹치는 프로필 이미지들 */}
            <div className="flex -space-x-12">
              {members.slice(0, 4).map((member, index) => (
                <div
                  key={member.id}
                  className="border-text-secondary relative h-32 w-32 overflow-hidden rounded-full border-2"
                  style={{ zIndex: members.length + index }}
                >
                  <Image
                    src={member.image}
                    alt={member.nickname}
                    fill
                    className="rounded-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
              {/* 추가 멤버가 있을 경우 +숫자 표시 */}
              {members.length > 4 && (
                <div className="border-text-secondary z-30 flex h-32 w-32 items-center justify-center rounded-full border-2 bg-gray-600">
                  <span className="label-large text-white">
                    +{members.length - 4}
                  </span>
                </div>
              )}
            </div>
            {/* 멤버 수 텍스트 */}
            <span
              ref={memberTextRef}
              className="text-text-primary label-small cursor-pointer underline"
              onClick={handleMemberTextClick}
            >
              {members.length}명 참여중
            </span>
          </div>
          {/* 팀원 진행도 % */}
          <div className="text-text-primary flex items-center justify-center gap-6 px-10">
            <span className="headline-medium">{teamProgress}%</span>
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
            animate={{ width: `${teamProgress}%` }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: 'easeOut',
            }}
          />
        </div>
      </div>
      <div className="w-220"></div>

      {/*초대 링크 */}
      <div
        className="bg-tertiary text-text-secondary hover:bg-tertiary/80 absolute right-20 -bottom-26 flex cursor-pointer gap-6 rounded-sm px-18 py-14"
        onClick={handleCopyInvite}
        title="클릭 시 복사"
      >
        <span className="title-medium">초대 코드 {inviteLink}</span>
        <CopyIcon width={24} height={24} />
      </div>
    </div>
  );
}

function ProfileModal({ members }: { members: StudyGroup['members'] }) {
  return (
    <div className="bg-surface-4 border-border-emphasis rounded-md border px-20 py-24 shadow-lg">
      <ul className="flex flex-col gap-14">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-12">
            <div className="relative h-32 w-32">
              <Image
                src={member.image || '/images/default-profile.png'}
                alt={member.nickname}
                fill
                className="rounded-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="label-small">{member.nickname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
