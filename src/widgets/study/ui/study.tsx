'use client';

import { useStudyGroup } from '@/entities/study/model/useStudyGroup';
import UpdateStudyInfo from '@/features/update-study-info/ui/update-study-info';
import StudyInfo from '@/entities/study/ui/studyInfo';
import UpdateStudyImage from '@/features/update-study-image/ui/update-study-image';
import { useInviteCodeStore } from '@/entities/dashboard';
import { useEffect } from 'react';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';
import { notFound } from 'next/navigation';
import { cn } from '@/shared/lib/utils/cn';
import MenuIcon from '@/assets/icon-menu.svg';
import { useDrawerStore } from '@/shared/model';

export default function Study({ studyId }: { studyId: string }) {
  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);
  const { inviteCode, setInviteCode } = useInviteCodeStore();
  // studyGroup의 userRole 정보 store에 저장
  const { role, setStudyRole } = useStudyRoleStore();
  const { isOpen, open, close } = useDrawerStore();

  useEffect(() => {
    if (studyGroup && studyGroup.inviteLink !== inviteCode) {
      setInviteCode(studyGroup.inviteLink);
    }
  }, [studyGroup, setInviteCode, inviteCode]);

  // 스터디 그룹의 userRole을 store에 저장
  // 이 부분은 스터디 그룹이 변경될 때마다 userRole을 업데이트합니다
  useEffect(() => {
    if (studyGroup && (studyGroup.userRole == 'LEADER') !== role) {
      setStudyRole(studyGroup.userRole);
    }
  }, [studyGroup, setStudyRole]);

  // 로딩 상태 처리
  if (isLoading) {
    return <></>;
  }

  // 에러 처리
  if (error) {
    // 404 페이지로 리다이렉트
    notFound();
  }

  // 스터디 그룹이 없을 경우 처리
  if (!studyGroup) {
    // 404 페이지로 리다이렉트
    notFound();
  }

  const hasImage = studyGroup.image;

  return (
    <div
      style={
        hasImage
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${studyGroup.image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }
          : {
              backgroundColor: '#3E4044',
            }
      }
      className={cn(
        'relative text-white',
        'px-18 pt-74 pb-34',
        'sm:px-54 sm:pt-44 sm:pb-32',
      )}
    >
      {/* 모바일 환경에서만 보이는 메뉴 아이콘 */}
      <MenuIcon
        width={24}
        height={24}
        onClick={isOpen ? close : open}
        className="absolute top-16 left-18 cursor-pointer sm:hidden"
      />

      <UpdateStudyInfo
        studyId={studyGroup.id}
        title={studyGroup.title}
        description={studyGroup.description}
      ></UpdateStudyInfo>
      <UpdateStudyImage studyId={studyGroup.id} />
      <StudyInfo
        members={studyGroup.members}
        teamProgress={studyGroup.teamProgress}
        inviteLink={studyGroup.inviteLink}
      />
    </div>
  );
}
