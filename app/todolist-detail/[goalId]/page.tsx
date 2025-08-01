import { fetchTodolist } from '@/entities/todolist/api';
import { todolistQueryKeys } from '@/entities/todolist/model';
import TodolistPage from '@/pages/todolist-detail/TodolistPage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function Page({
  params,
}: {
  params: Promise<{ goalId: string }>;
}) {
  const goalId = (await params).goalId;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  await queryClient.prefetchQuery({
    queryKey: todolistQueryKeys.todolist(goalId),
    queryFn: () => fetchTodolist(goalId),
  });
  // console.log(queryClient.getQueryData(todolistQueryKeys.todolist(goalId)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodolistPage />
    </HydrationBoundary>
  );
}
