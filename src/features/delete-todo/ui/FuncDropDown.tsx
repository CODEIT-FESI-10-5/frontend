// import { cn } from '@/shared/lib/utils/cn';
// import { useDeleteModalStore } from '../store';
// import { useEffect, useRef } from 'react';

// interface DropDownProps {
//   items: Array<{ name: string; handleClick: () => void }>;
// }

// export default function FuncDropDown({ items }: DropDownProps) {
//   const { activateTodoId, modalPosition, setActivateTodoId } =
//     useDeleteModalStore();

//   const ref = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (ref.current && !ref.current.contains(event.target as Node)) {
//         setActivateTodoId('');
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [ref, setActivateTodoId]);

//   return (
//     activateTodoId === '' && (
//       <div
//         ref={ref}
//         className={cn(
//           `absolute top-[${modalPosition.top}] right-[${modalPosition.left}] z-10 flex`,
//           'flex-col overflow-hidden rounded-lg bg-white shadow-xl/35',
//         )}
//       >
//         {items.map((item, idx) => (
//           <button
//             key={idx.toString() + item.name}
//             className="cursor-pointer items-center justify-center px-24 py-12 whitespace-nowrap transition hover:bg-gray-200"
//             onClick={item.handleClick}
//           >
//             {item.name}
//           </button>
//         ))}
//       </div>
//     )
//   );
// }
