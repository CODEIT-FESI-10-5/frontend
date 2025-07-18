import { Profile } from '@/features/getProfile/ui';
import CreateStudyButton from '@/features/sidebar/button/ui/CreateStudyButton';
import JoinButton from '@/features/sidebar/button/ui/JoinStudyButton';
import StudyGoalList from '@/features/sidebar/goal/ui/StudyGoalList';
import StudyList from '@/features/sidebar/study/ui/StudyList';

export default function SideBar() {
  return (
    <div className="bg-surface-2 fixed flex h-screen w-348 flex-col gap-64 p-26">
      <div>
        <img src="/public/images/logo.png" alt="logo" />
        <Profile />
        <div className="mt-24 flex justify-between">
          <CreateStudyButton />
          <JoinButton />
        </div>
      </div>
      <StudyList />
      <StudyGoalList />
    </div>
  );
}
