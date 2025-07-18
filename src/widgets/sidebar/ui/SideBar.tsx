import { Profile } from '@/features/get-profile/ui';
import { CreateStudyButton } from '@/features/create-study/ui';
import JoinStudyButton from '@/widgets/sidebar/ui/JoinStudyButton';
import { StudyGoalList } from '@/features/get-goal-list/ui';
import { StudyList } from '@/features/get-study-list/ui';

export default function SideBar() {
  return (
    <div className="bg-surface-2 fixed flex h-screen w-348 flex-col gap-64 p-26">
      <div>
        <img src="/images/logo.png" alt="logo" className="mb-28 h-28 w-115" />
        <Profile />
        <div className="mt-24 flex justify-between">
          <CreateStudyButton />
          <JoinStudyButton />
        </div>
      </div>
      <StudyList />
      <StudyGoalList />
    </div>
  );
}
