// import { useEffect } from 'react';
// import { useTodolistStore } from '../store/todolistStore';
// import sortTodolistByOrderArray from '../../../fetch-goal/lib/utils/sortTodosByOrderArray';
// import divideTodolistGroup from '../../../fetch-goal/lib/utils/divideTodoGroup';
// import { useGoalQuery } from '@/features/fetch-goal/model/hooks';

// export function useTodolistGroupInit(todolistId: string) {
//   const { data } = useGoalQuery(todolistId);
//   const { setTodolistId, setAllGroup } = useTodolistStore();

//   useEffect(() => {
//     if (!data) return;
//     // console.log(data);

//     const ordered = sortTodolistByOrderArray(data.todolist, data.order);
//     const { newShared, newPersonal, newDone } = divideTodolistGroup(ordered);

//     setTodolistId(data.todolistId);
//     setAllGroup(newDone, newShared, newPersonal);
//   }, [data, setAllGroup, setTodolistId]);
// }
