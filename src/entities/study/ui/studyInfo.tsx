'use client';

import { motion } from 'framer-motion';
import type { StudyGroup } from '../model';
import CopyIcon from '@/assets/copy.svg';
import { useRef } from 'react';
import Image from 'next/image';
import { useModal } from '@/shared/lib/utils/useModal';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils/cn';
import CloseIcon from '@/assets/icon-close.svg';
import { Button } from '@/shared/ui';

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
    if (members.length > 0) {
      // 모바일에서는 하단 모달, 데스크톱에서는 위치 기반 모달
      const isMobile = window.innerWidth < 768; // md breakpoint

      if (isMobile) {
        open(
          <ProfileModal members={members} />,
          undefined,
          undefined,
          'bottom',
        );
      } else {
        open(<ProfileModal members={members} />, memberTextRef, {
          top: 8,
          left: 0,
        });
      }
    }
  };

  // 초대코드 복사 핸들러
  const handleCopyInvite = async () => {
    if (!inviteLink) {
      toast.error('초대 코드가 없습니다.');
      return;
    }

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
                  className="border-text-secondary relative h-26 w-26 overflow-hidden rounded-full border-2 md:h-32 md:w-32"
                  style={{ zIndex: members.length + index }}
                >
                  <Image
                    src={member.image || '/images/default-profile.png'}
                    alt={member.nickname}
                    fill
                    className="rounded-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
              {/* 추가 멤버가 있을 경우 +숫자 표시 */}
              {members.length > 4 && (
                <div className="border-text-secondary z-30 flex h-26 w-26 items-center justify-center rounded-full border-2 bg-gray-600 md:h-32 md:w-32">
                  <span className="m-label-medium md:label-large text-white">
                    +{members.length - 4}
                  </span>
                </div>
              )}
            </div>
            {/* 멤버 수 텍스트 */}
            <span
              ref={memberTextRef}
              className="text-text-primary m-label-small md:label-small cursor-pointer underline"
              onClick={handleMemberTextClick}
            >
              {members.length}명 참여중
            </span>
          </div>
          {/* 팀원 진행도 % */}
          <div className="text-text-primary flex items-center justify-center gap-6 px-10">
            <span className="m-title-medium md:headline-medium">
              {teamProgress}%
            </span>
            <span className="m-label-small md:label-small">달성중</span>
          </div>
        </div>
        {/* Progress 바 */}
        {/* Progress Bar Container */}
        <div className="h-10 w-full overflow-hidden rounded-full bg-[#e1e1e1] backdrop-blur-md md:h-14">
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
      <div className={cn('', 'hidden', 'w-220 md:block')}></div>

      {/*초대 링크 버튼 - 공용 Button 컴포넌트 사용*/}
      <Button
        label={
          <span
            className={cn(
              'flex items-center gap-6',
              'm-body-large md:title-medium',
            )}
          >
            {`초대 코드 ${inviteLink}`}
            <CopyIcon
              width={24}
              height={24}
              className={cn('hidden md:block')}
            />
          </span>
        }
        theme="tertiary"
        size="md"
        className={cn(
          'absolute right-18 -bottom-18 md:right-20 md:-bottom-26',
          'h-auto px-14 py-8',
        )}
        onClick={handleCopyInvite}
        title="클릭 시 복사"
      />
    </div>
  );
}

function ProfileModal({ members }: { members: StudyGroup['members'] }) {
  const { close } = useModal();

  return (
    <div className="bg-surface-4 flex flex-col gap-24 rounded-t-2xl p-24 shadow-lg md:hidden">
      {/* 모바일용 하단 모달 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="m-title-medium text-white">팀원 목록</h3>
        <CloseIcon width={24} height={24} onClick={close} />
      </div>

      {/* 멤버 리스트 */}
      <ul className="flex flex-col gap-14">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-12">
            <div className="relative h-40 w-40">
              <Image
                src={member.image || '/images/default-profile.png'}
                alt={member.nickname}
                fill
                className="rounded-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <span className="m-body-small text-white">{member.nickname}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
