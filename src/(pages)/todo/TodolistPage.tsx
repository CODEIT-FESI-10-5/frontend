import TodolistPanel from '@/widgets/todolist-detail/ui/TodolistPanel';

export default function TodolistPage() {
  return (
    <div className="flex">
      <div className="w-348">Temp sidebar</div>
      <div className="bg-background min-h-screen flex-grow p-30 text-black">
        <TodolistPanel />
      </div>
    </div>
  );
}
