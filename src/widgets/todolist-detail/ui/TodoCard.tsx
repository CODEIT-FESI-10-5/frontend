// 'use client';

// import TodoCheckBox from '@/shared/ui/TodoCheckBox';
// import { cn } from '@/shared/lib/utils/cn';
// import IconDots from '@/../public/assets/icon-dots.svg';
// import IconNote from '@/../public/assets/icon-note.svg';
// import { useState } from 'react';
// import IconButton from '@/shared/ui/IconButton';
// import IconLink from '@/shared/ui/IconLink';
// import FuncDropDown from '../../../features/delete-todo/ui/FuncDropDown';
// import PortalBackdrop from './PortalBackdrop';
// import { useDeleteTodoMutation } from '@/features/delete-todo/model/hooks';
// import { useUpdateTodoMutation } from '@/features/update-todo/model/hooks/useUpdateTodo';
// import TodoInfo from '@/entities/todo/ui/todoInfo';
// import { Todo } from '@/entities/todo';

// const TODOLIST_ID = '12345';

// export interface TodoCardProps {
//   idx?: number;
//   todo: Todo;
// }

// export default function TodoCard({ todo }: TodoCardProps) {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const updateTodo = useUpdateTodoMutation();
//   const handleCheck = () => {
//     updateTodo.mutate({
//       goalId: TODOLIST_ID,
//       todoId: todo.id,
//       newTodoState: { completed: !todo.completed },
//     });
//   };
//   const deleteTodo = useDeleteTodoMutation();
//   const handleDelete = () => {
//     deleteTodo.mutate({ todolistId: TODOLIST_ID, todoId: todo.id });
//   };

//   return (
//     <div
//       className={cn(
//         'text-text-primary flex min-h-70 min-w-650 items-center justify-between gap-16',
//         'border-border-default bg-surface-4 rounded-lg border-1 px-16 py-8 shadow-2xl transition-colors',
//       )}
//     >
//       <div className="flex items-start gap-16">
//         <TodoCheckBox isChecked={todo.completed} handleClick={handleCheck} />
//         <TodoInfo todo={todo} />
//       </div>
//       <div className="flex items-center gap-4">
//         <IconLink href={`/todo/${todo.id}/note`} IconName={IconNote} />
//         <div className="relative">
//           <IconButton IconName={IconDots} onClick={() => setIsOpen(true)} />
//           {isOpen && (
//             <FuncDropDown
//               items={[{ name: '투두 삭제', handleClick: () => handleDelete() }]}
//             />
//           )}
//           <PortalBackdrop isOpen={isOpen} onClose={() => setIsOpen(false)} />
//         </div>
//       </div>
//     </div>
//   );
// }
