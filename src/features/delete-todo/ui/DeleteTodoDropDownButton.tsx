import DotsIcon from '@/assets/dots.svg';
import { useRef } from 'react';
import { useModal } from '@/shared/lib/utils/useModal';
import { useDeleteTodoMutation } from '../model/hooks';
import { useGoalId } from '@/shared/model/useGoalId';

export default function DeleteTodoDropDownButton({
  todoId,
}: {
  todoId: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { open, close } = useModal();
  const goalId = useGoalId();
  const deleteTodo = useDeleteTodoMutation(goalId);
  const items = [
    {
      name: '투두 삭제',
      handleClick: () => {
        deleteTodo.mutate({ todoId });
        close();
      },
    },
  ];

  const handleClick = () => {
    if (buttonRef.current) {
      open(<DeleteModal items={items} />, buttonRef, {
        top: -17,
        left: -94,
      });
    }
  };
  return (
    <button
      aria-label="delete-todo-dropdown-btn"
      ref={buttonRef}
      onClick={handleClick}
      className="cursor-pointer transition hover:scale-120"
    >
      <DotsIcon className="h-26 w-26 md:h-32 md:w-32" />
    </button>
  );
}

function DeleteModal({
  items,
}: {
  items: Array<{ name: string; handleClick: () => void }>;
}) {
  return (
    <div className="bg-surface-4 border-border-emphasis overflow-hidden rounded-md border shadow-lg">
      <ul className="flex flex-col gap-14">
        {items.map((item, idx) => (
          <button
            key={idx.toString() + item.name}
            className="hover:bg-surface-3 cursor-pointer items-center justify-center px-24 py-12 transition"
            onClick={item.handleClick}
          >
            {item.name}
          </button>
        ))}
      </ul>
    </div>
  );
}
