import Profile from '@/entities/user/ui/Profile';
import CreateStudyButton from '@/features/sidebar/button/ui/CreateStudyButton';
import JoinButton from '@/features/sidebar/button/ui/JoinStudyButton';
import StudyGoalList from '@/features/sidebar/goal/ui/StudyGoalList';
import StudyList from '@/features/sidebar/study/ui/StudyList';

export default function SideBar() {
  return (
    <div className="bg-surface-2 fixed flex h-screen w-348 flex-col gap-64 p-26">
      <div>
        <div>logo</div>
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
