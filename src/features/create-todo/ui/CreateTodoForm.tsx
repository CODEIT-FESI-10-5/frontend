import { cn } from '@/shared/lib/utils/cn';
import { useCreateTodoStore } from '@/features/create-todo/model/store/createTodoStore';
import { useCreateTodoMutation } from '../model/hooks';
import CheckTodoBlankIcon from '@/assets/check_todo_blank.svg';
import { useGoalId } from '@/shared/model/useGoalId';
import { useTodolistQuery } from '@/entities/todolist/model/hooks';
import { Button } from '@/shared/ui';
import CheckSquareBlankIcon from '@/assets/check_square_blank.svg';
import CheckSquareFillPrimaryIcon from '@/assets/check-square-fill-primary.svg';

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
      className={cn(
        'bg-surface-4 jutify-between mb-16 flex h-fit min-h-72 w-full items-center rounded-lg border',
        'm-body-large md:body-medium gap-14 px-12 py-14 md:px-14',
        data?.role === 'LEADER' ? 'flex-col md:flex-row' : '',
        isInvalid ? 'border-highlight' : 'border-surface-4',
      )}
    >
      <div
        className={cn('flex min-w-0 flex-grow gap-14', {
          'self-start md:self-center': data?.role === 'LEADER',
        })}
      >
        <CheckTodoBlankIcon className="h-24 w-24 flex-shrink-0 md:h-[30px] md:w-[30px]" />
        <input
          aria-invalid={isInvalid ? 'true' : undefined}
          className={cn(
            'min-w-0 flex-shrink-1 flex-grow text-white outline-none',
            isInvalid
              ? 'placeholder:text-highlight'
              : 'placeholder:text-text-tertiary',
          )}
          type="text"
          placeholder="입력하세요..."
          maxLength={30}
          value={content}
          onChange={(e) => {
            if (e.target.value && isInvalid) {
              setIsInvalid(false);
            }
            setContent(e.target.value);
          }}
        />
      </div>

      <div
        className={cn(
          'flex shrink-0 justify-end gap-9',
          data?.role === 'LEADER' ? 'self-end md:self-center' : '',
        )}
      >
        {data?.role === 'LEADER' && (
          <Button
            label={
              <div className="flex items-center justify-center gap-2">
                {isShared ? (
                  <CheckSquareFillPrimaryIcon width={28} height={28} />
                ) : (
                  <CheckSquareBlankIcon width={28} height={28} />
                )}
                {'공통'}
              </div>
            }
            size={'sm'}
            theme={'emphasis'}
            onClick={() => toggleIsShared()}
            type="button"
            className="w-88 px-14"
          />
        )}
        <Button
          label={'완료'}
          size={'sm'}
          theme={'primary'}
          type="submit"
          className="w-88"
        />
      </div>
    </form>
  );
}
