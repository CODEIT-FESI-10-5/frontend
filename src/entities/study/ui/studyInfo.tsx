'use client';

import { motion } from 'framer-motion';
import type { StudyGroup } from '../model';
import CopyIcon from '@/assets/copy.svg';
import { useRef } from 'react';
import { useModal } from '@/shared/lib/utils/useModal';

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
      open(<ProfileModal members={members} />, { ref: memberTextRef });
    }
  };

  return (
    <div className="max-w-1000">
      {/*TODO Progress 바 max-w 어디까지 설정할지 */}
      <div className="mb-12 flex max-w-1000 items-end justify-between">
        {/* 팀원 목록 */}
        <div className="flex items-center gap-8">
          {/* 겹치는 프로필 이미지들 */}
          <div className="flex -space-x-12">
            {members.slice(0, 4).map((member, index) => (
              <div
                key={member.id}
                className="border-text-secondary h-32 w-32 overflow-hidden rounded-full border-2"
                style={{ zIndex: members.length + index }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
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
          <span className="headline-small">{teamProgress}%</span>
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
      {/*초대 링크 */}
      <div className="bg-tertiary text-text-secondary absolute right-20 -bottom-26 flex gap-6 rounded-sm px-18 py-14">
        <span className="title-medium">초대 코드 {inviteLink}</span>
        <CopyIcon width={10} height={10} />
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
            <img
              src={member.image}
              alt={member.name}
              className="h-32 w-32 rounded-full object-cover"
            />
            <span>{member.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
