import { StudyGoalList } from '@/features/get-goal-list/ui';
import { StudyList } from '@/features/get-study-list/ui';
import SideBarInfo from '@/widgets/sidebar/ui/SideBarInfo';

export default function SideBar() {
  return (
    <div className="bg-surface-2 fixed flex h-screen w-348 flex-col gap-64 p-26">
      <div>
        <img src="/images/logo.png" alt="logo" className="mb-28 h-28 w-115" />
        <SideBarInfo />
      </div>
      <StudyList />
      <StudyGoalList />
    </div>
  );
}
