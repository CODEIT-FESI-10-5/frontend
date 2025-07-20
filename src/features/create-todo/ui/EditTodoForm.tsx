import Button from '@/shared/ui/TodoButton';
import { useCreateTodoMutation } from '@/features/todo/model/hooks/useTodolist';
import ToggleButton from '@/shared/ui/ToggleButton';
import { cn } from '@/shared/utils/cn';
import { useCreateTodoStore } from '@/features/create-todo/model/store/createTodoStore';

const TODOLIST_ID = '12345';
const IS_ADMIN = true;

export default function CreateTodoForm() {
  const { content, setContent } = useCreateTodoStore();
  const { isInvalid, setIsInvalid } = useCreateTodoStore();
  const { isShared, toggleIsShared } = useCreateTodoStore();
  const { resetField, toggleEditMode } = useCreateTodoStore();

  const createTodo = useCreateTodoMutation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') {
      setIsInvalid(true); // 경고 테두리
      return; // 서버 요청 중단
    }

    setIsInvalid(false); // 유효하니 경고 해제

    // 새 Todo 추가 요청 구현부
    createTodo.mutate({
      todolistId: TODOLIST_ID,
      newTodo: { content, shared: isShared },
    });

    // 필드 상태 초기화 후 창 닫기
    resetField();
    toggleEditMode();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-16 flex min-h-70 min-w-650 justify-between gap-16 rounded-lg bg-white p-16"
    >
      <input
        className={cn(
          'body-small flex-grow',
          'border-border-default outline-none focus:border-b-1',
          {
            'border-frame-error border-b-1 placeholder:text-red-300': isInvalid,
          },
        )}
        type="text"
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />

      <div className="flex flex-shrink-0 justify-between gap-8">
        {IS_ADMIN && (
          <ToggleButton isOn={isShared} toggleSwitch={() => toggleIsShared()}>
            {'공통'}
          </ToggleButton>
        )}
        <Button size="md" color="bg-surface-4">
          {'완료'}
        </Button>
      </div>
    </form>
  );
}
