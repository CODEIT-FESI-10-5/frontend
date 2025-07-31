import SideBarInfo from '@/widgets/sidebar/ui/SideBarInfo';
import SideBarNav from './SideBarNav';

export default function SideBar() {
  return (
    <div className="bg-surface-2 fixed top-0 bottom-0 left-0 flex w-348 flex-col gap-64 p-26">
      <SideBarInfo />
      <SideBarNav />
    </div>
  );
}
