import RouterBackButton from '@/shared/ui/RouterBackButton';
import TodolistPanel from '@/widgets/todolist-detail/ui/TodolistPanel';
import IconBack3 from '@/assets/icon-back3.svg';

export default function TodolistPage() {
  return (
    <div className="flex flex-col gap-18">
      <div className="hidden xl:flex">
        <RouterBackButton>
          <IconBack3 />
        </RouterBackButton>
      </div>
      <TodolistPanel />
    </div>
  );
}
