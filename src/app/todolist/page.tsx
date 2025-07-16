import TodolistPanel from '@/features/todo/TodolistPanel';

export default function Todolist() {
  return (
    <div className="bg-surface-100 flex min-h-screen gap-4 p-8 text-black">
      <TodolistPanel />
    </div>
  );
}
