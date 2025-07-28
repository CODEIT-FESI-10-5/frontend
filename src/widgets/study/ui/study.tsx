'use client';

import { useStudyGroup } from '@/entities/study/model/useStudyGroup';
import UpdateStudyInfo from '@/features/update-study-info/ui/update-study-info';
import StudyInfo from '@/entities/study/ui/studyInfo';
import UpdateStudyImage from '@/features/update-study-image/ui/update-study-image';
import { useInviteCodeStore } from '@/entities/dashboard';
import { useEffect } from 'react';
import { useStudyRoleStore } from '@/entities/study/model/useStudyRoleStore';

export default function Study({ studyId }: { studyId: string }) {
  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);
  const { inviteCode, setInviteCode } = useInviteCodeStore();
  // studyGroup의 userRole 정보 store에 저장
  const { role, setStudyRole } = useStudyRoleStore();

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
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  // 에러 처리
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">
          에러 발생:{' '}
          {error instanceof Error ? error.message : '알 수 없는 에러'}
        </div>
      </div>
    );
  }

  // 스터디 그룹이 없을 경우 처리
  if (!studyGroup) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">스터디 그룹을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${studyGroup.image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className="relative px-54 pt-44 pb-32 text-white"
    >
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
