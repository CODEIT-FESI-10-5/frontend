import { useState } from 'react';
import Button from '@/shared/ui/Button';
import { useCreateTodoMutation } from '@/features/todo/hooks/useTodolist';
import ToggleButton from '@/shared/ui/ToggleButton';
import { cn } from '@/shared/utils/cn';

const TODOLIST_ID = '12345';
const IS_ADMIN = true;

export default function EditTodoCard() {
  const [content, setContent] = useState<string>('');
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<boolean>(false);

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

    // 필드 상태 초기화
    setContent('');
    setIsShared(false);

    // 입력 창 닫기
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex min-h-[70px] min-w-[650px] justify-between gap-4 rounded-lg bg-white p-4"
    >
      <input
        className={cn(
          'flex-grow appearance-none text-xl font-bold',
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

      <div className="flex flex-shrink-0 justify-between gap-2">
        {IS_ADMIN && (
          <ToggleButton
            isOn={isShared}
            toggleSwitch={() => setIsShared(!isShared)}
          >
            {'공통'}
          </ToggleButton>
        )}
        <Button size="md" color="bg-surface-400">
          {'완료'}
        </Button>
      </div>
    </form>
  );
}
