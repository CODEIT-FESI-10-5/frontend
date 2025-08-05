import { cn } from '@/shared/lib/utils/cn';
import { useCreateTodoStore } from '@/features/create-todo/model/store/createTodoStore';
import { useCreateTodoMutation } from '../model/hooks';
import ToggleButton from './ToggleButton';
import ConfirmButton from '@/features/create-todo/ui/ConfirmButton';
import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import { useGoalId } from '@/shared/model/useGoalId';
import { useTodolistQuery } from '@/entities/todolist/model/hooks';

export default function CreateTodoForm() {
  const goalId = useGoalId();
  const { data } = useTodolistQuery(goalId);
  const { content, setContent } = useCreateTodoStore();
  const { isInvalid, setIsInvalid } = useCreateTodoStore();
  const { isShared, toggleIsShared } = useCreateTodoStore();
  const { resetField, toggleEditMode } = useCreateTodoStore();
  const createTodo = useCreateTodoMutation(goalId);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') {
      setIsInvalid(true); // 경고 테두리
      return; // 서버 요청 중단
    }

    setIsInvalid(false); // 유효하니 경고 해제

    // 새 Todo 추가 요청 구현부
    createTodo.mutate({
      newTodo: { content, shared: isShared },
    });

    // 필드 상태 초기화 후 창 닫기
    resetField();
    toggleEditMode();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface-4 mb-16 flex h-72 w-full items-center justify-between gap-14 rounded-lg p-16"
    >
      <CheckTodoBlankIcon width={30} height={30} />
      <input
        aria-invalid={isInvalid ? 'true' : undefined}
        className={cn(
          'body-medium text-text-secondary placeholder:text-text-tertiary flex-grow',
          'border-border-default outline-none',
          {
            'border-frame-error placeholder:text-red-300': isInvalid,
          },
        )}
        type="text"
        placeholder="입력하세요..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <div className="flex flex-shrink-0 justify-between gap-9">
        {data?.role && (
          <ToggleButton isOn={isShared} toggleSwitch={() => toggleIsShared()}>
            {'공통'}
          </ToggleButton>
        )}
        <ConfirmButton size="md" color="bg-primary">
          {'완료'}
        </ConfirmButton>
      </div>
    </form>
  );
}
