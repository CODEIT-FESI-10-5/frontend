import Profile from '@/features/sidebar/profile/ui/Profile';
import CreateStudyButton from '@/features/sidebar/button/ui/CreateStudyButton';
import JoinButton from '@/features/sidebar/button/ui/JoinStudyButton';

export default function SideBar() {
  return (
    <div className="bg-surface-2 fixed h-screen w-348 p-26">
      <div>logo</div>
      <Profile />
      <div className="mt-24 flex justify-between">
        <CreateStudyButton />
        <JoinButton />
      </div>
    </div>
  );
}
