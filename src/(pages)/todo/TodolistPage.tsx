import TodolistPanel from '@/features/todo/ui/TodolistPanel';

export default function TodolistPage() {
  return (
    <div className="flex">
      <div className="bg-surface-2 w-348 text-black">Temp sidebar</div>
      <div className="bg-background min-h-screen flex-grow p-30 text-black">
        <TodolistPanel />
      </div>
    </div>
  );
}
