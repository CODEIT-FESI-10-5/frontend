import DotsIcon from '@/assets/dots.svg';
import IconButton from '@/shared/ui/IconButton';
import { useDeleteModalStore } from '../store';

export default function DeleteTodoDropDownButton({
  todoId,
}: {
  todoId: string;
}) {
  const { setActivateTodoId } = useDeleteModalStore();
  return (
    <div className="relative">
      <IconButton
        IconName={DotsIcon}
        onClick={() => setActivateTodoId(todoId)}
      />
    </div>
  );
}
