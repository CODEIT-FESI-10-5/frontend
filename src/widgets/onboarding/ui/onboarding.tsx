'use client';

import Image from 'next/image';
import { useModal } from '@/shared/lib/utils/useModal';
import JoinStudyModal from '@/features/join-study/ui/JoinStudyModal';
import { useCreateStudy } from '@/features/create-study/model/useCreateStudy';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils/cn';

export default function Onboarding() {
  const { open } = useModal();
  const mutation = useCreateStudy();

  const handleJoinClick = () => {
    open(<JoinStudyModal />);
  };

  const handleCreateClick = () => {
    mutation.mutate(null);
  };

  return (
    <div
      className={cn(
        'flex h-[90dvh] w-full items-center justify-center rounded-lg text-white',
      )}
    >
      {/* 데스크톱 버전 - 좌우 배치 */}
      <div
        className={cn(
          'hidden h-full',
          'md:flex md:items-center md:justify-center md:px-16',
        )}
      >
        <div className={cn('flex max-w-6xl items-center gap-30')}>
          {/* 왼쪽: 텍스트와 버튼 */}
          <div className={cn('flex-1')}>
            <div className={cn('mb-30 flex flex-col gap-10')}>
              <h1 className={cn('headline-large')}>
                가입한 스터디가 없습니다.
              </h1>
              <p className={cn('body-small text-text-secondary')}>
                스터디를 만들거나 코드를 입력해 가입해 보세요.
              </p>
            </div>

            <div className={cn('flex flex-col gap-16')}>
              <Button
                label="스터디 만들기 (팀장으로 시작)"
                size="lg"
                theme="primary"
                onClick={handleCreateClick}
              >
                스터디 만들기 (팀장으로 시작)
              </Button>
              {/* 초대 모달 */}
              <Button
                label="초대코드로 가입하기"
                size="lg"
                theme="tertiary"
                onClick={handleJoinClick}
              />
            </div>
          </div>

          {/* 오른쪽: 이미지 */}
          <div className={cn('flex flex-1 justify-center')}>
            <Image
              src="/images/onboarding.png"
              alt="onboarding image"
              width={535}
              height={340}
            />
          </div>
        </div>
      </div>

      {/* 모바일 버전 - 상하 배치 (기존과 동일) */}
      <div
        className={cn(
          'flex h-full flex-col items-center justify-center px-6',
          'md:hidden',
        )}
      >
        <div className={cn('mb-32 text-center')}>
          <h1 className={cn('mb-10', 'm-headline-large')}>
            가입한 스터디가 없습니다.
          </h1>
          <p className={cn('text-text-secondary', 'm-body-small')}>
            스터디를 만들거나 코드를 입력해 가입해 보세요.
          </p>
        </div>

        <div className={cn('mb-30')}>
          <Image
            src="/images/onboarding.png"
            alt="onboarding image"
            width={337}
            height={243}
          />
        </div>

        <div className={cn('flex w-full max-w-sm flex-col gap-16')}>
          <Button
            label="스터디 만들기(팀장으로 시작)"
            size="lg"
            theme="primary"
            onClick={handleCreateClick}
          />
          <Button
            label="초대코드로 가입하기"
            size="lg"
            theme="tertiary"
            onClick={handleJoinClick}
          />
        </div>
      </div>
    </div>
  );
}
