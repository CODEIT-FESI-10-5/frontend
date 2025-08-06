'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInviteCodeStore, teamProgress } from '@/entities/dashboard';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils/cn';

// 팀원이 없을 때 안내 UI 추가
export default function TeamProgress({
  teamProgress,
}: {
  teamProgress: teamProgress[];
}) {
  const { inviteCode } = useInviteCodeStore();
  const myName = localStorage.getItem('nickname');

  if (teamProgress.length === 0) {
    return (
      <div
        className={cn(
          'bg-surface-3 border-border-subtle flex flex-col rounded-lg border',
          'h-[204px] w-full gap-18 px-18 py-26',
          'md:max-w-[423px] md:px-30 md:py-34',
        )}
      >
        <span
          className={cn(
            'text-text-secondary',
            'm-headline-medium',
            'md:headline-medium',
          )}
        >
          팀원 달성률
        </span>
        <div className={cn('flex flex-col items-center justify-center gap-24')}>
          <span
            className={cn(
              'text-text-secondary text-center',
              'm-label-small',
              'md:label-small',
            )}
          >
            같이 하면 더 힘이나요.
            <br />
            팀원을 초대해 함께 목표를 이뤄볼까요?
          </span>
          <div className={cn('relative flex items-center gap-8')}>
            <div
              className={cn(
                'bg-surface-4 text-primary border-border-emphasis rounded border',
                'title-medium',
                '',
              )}
            >
              <span className={cn('px-20 py-8')}>{inviteCode}</span>
              <button
                className={cn(
                  'bg-primary cursor-pointer rounded-sm text-nowrap text-white',
                  'm-body-small px-16 py-10',
                  'md:body-medium',
                )}
                onClick={() => {
                  navigator.clipboard.writeText(String(inviteCode));
                  toast.success('초대 코드가 복사되었습니다!');
                }}
              >
                코드 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 기존 팀원 달성률 UI (팀원이 있을 때)
  // 내림차순 정렬 (진행도 높은 순)
  const sorted = [...teamProgress].sort((a, b) => b.progress - a.progress);
  const maxMembers = 4;
  const filled = sorted.slice(0, maxMembers);
  return (
    <div
      className={cn(
        'bg-surface-2 border-border-subtle w-full rounded-md border',
        'h-[380px] px-16 py-26',
        'md:max-w-[423px] md:p-34',
      )}
    >
      <div className={cn('flex h-full flex-col justify-between')}>
        <div className={cn('flex items-center justify-between')}>
          <span
            className={cn(
              'text-white',
              'm-headline-medium',
              'md:headline-medium',
            )}
          >
            팀원 달성률
          </span>
          {/* <span className="label-small text-text-tertiary">5분전 업데이트</span> */}
        </div>
        <ul
          className={cn(
            'flex h-full w-full items-end',
            'justify-around',
            'md:justify-between',
          )}
        >
          {Array.from({ length: maxMembers }).map((_, idx) => {
            const member = filled[idx];
            const isFirst = idx === 0;
            // 자기 자신이면 색상 강조
            const isMe = member && member.name === myName;
            const barColor = isMe
              ? 'bg-highlight'
              : isFirst
                ? 'bg-secondary'
                : 'bg-icon-grey-300';
            const barHeight = member ? 22 + (member.progress / 100) * 98 : 22;
            const rankText = `${idx + 1}위`;
            if (member) {
              return (
                <li
                  key={member.name}
                  className={cn('relative flex flex-col items-center gap-6')}
                >
                  <div
                    className={cn(
                      'mb-10 flex flex-col items-center justify-center gap-10',
                    )}
                  >
                    <span
                      className={cn(
                        'text-text-secondary max-w-[60px] truncate',
                        'label-small',
                        '',
                      )}
                    >
                      {member.name}
                    </span>
                    <Image
                      width={52}
                      height={52}
                      src={member.image || '/images/default-profile.png'}
                      alt={member.name}
                      className={cn(
                        'border-icon-grey-200 rounded-full border-4 object-cover',
                      )}
                    />
                  </div>
                  <motion.div
                    className={`bottom-0 flex flex-col items-center justify-end ${barColor} relative w-64 rounded-t-md`}
                    initial={{ height: 22 }}
                    animate={{ height: barHeight }}
                    transition={{ duration: 1 }}
                  >
                    <span
                      className={cn(
                        'absolute bottom-3 text-white',
                        'body-small',
                        '',
                      )}
                    >
                      {member.progress}%
                    </span>
                  </motion.div>
                  <span className={cn('text-text-primary', 'body-medium', '')}>
                    {rankText}
                  </span>
                </li>
              );
            } else {
              // 빈 슬롯
              return (
                <li
                  key={`empty-${idx}`}
                  className={cn('relative flex flex-col items-center gap-6')}
                >
                  <div
                    className={cn(
                      'mb-10 flex flex-col items-center justify-center gap-10',
                    )}
                  >
                    <span
                      className={cn(
                        'max-w-[60px] truncate text-transparent select-none',
                        'label-small',
                        '',
                      )}
                    >
                      -
                    </span>
                    <div
                      className={cn(
                        'border-icon-grey-200 bg-icon-grey-300 rounded-full border-4',
                        'h-52 w-52',
                        '',
                      )}
                    />
                  </div>
                  <motion.div
                    className={cn(
                      'bg-icon-grey-300 relative bottom-0 flex flex-col items-center justify-end rounded-t-md',
                      'w-64',
                      '',
                    )}
                    initial={{ height: 22 }}
                    animate={{ height: 22 }}
                    transition={{ duration: 1 }}
                  >
                    <span
                      className={cn(
                        'absolute bottom-3 text-white',
                        'body-small',
                        '',
                      )}
                    >
                      0%
                    </span>
                  </motion.div>
                  <span className={cn('text-text-primary', 'body-medium', '')}>
                    {rankText}
                  </span>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
