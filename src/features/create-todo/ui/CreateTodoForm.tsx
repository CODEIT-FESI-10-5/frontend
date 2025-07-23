import { cn } from '@/shared/lib/utils/cn';
import { useCreateTodoStore } from '@/features/create-todo/model/store/createTodoStore';
import { useCreateTodoMutation } from '../model/hooks';
import ToggleButton from './ToggleButton';
import ConfirmButton from '@/features/create-todo/ui/ConfirmButton';
import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';

const IS_ADMIN = true;

export default function CreateTodoForm() {
  const { content, setContent } = useCreateTodoStore();
  const { isInvalid, setIsInvalid } = useCreateTodoStore();
  const { isShared, toggleIsShared } = useCreateTodoStore();
  const { resetField, toggleEditMode } = useCreateTodoStore();

  const createTodo = useCreateTodoMutation('goal-1');
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
      className="bg-surface-4 mb-16 flex min-h-70 min-w-650 items-center justify-between gap-14 rounded-lg p-16"
    >
      <CheckTodoBlankIcon width={30} height={30} />
      <input
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
        {IS_ADMIN && (
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
