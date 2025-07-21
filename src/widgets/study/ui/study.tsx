import { useStudyGroup } from '@/entities/study/model/useStudyGroup';
import UpdateStudyInfo from '@/features/update-study-info/ui/update-study-info';
import StudyInfo from '@/entities/study/ui/studyInfo';
import UpdateStudyImage from '@/features/update-study-image/ui/update-study-image';

export default function Study({ studyId }: { studyId: string }) {
  const { data: studyGroup, isLoading, error } = useStudyGroup(studyId);

  {
    /*entities useStudyGroup 으로 데이터 가져오기 */
  }
  {
    /*가져온 데이터를 features로 전달 */
  }
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
