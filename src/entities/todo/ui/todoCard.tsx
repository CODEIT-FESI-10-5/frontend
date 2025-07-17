import { Todo } from "../model";

export default function TodoCard(props: { todo: Todo }) {
  const { todo } = props;

  //완료된 투두일때
  if (todo.completed) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg text-[#313131] flex justify-between items-center w-[469px] h-[76px]">
        <div className="flex justify-center items-center gap-2">
          {/*체크 박스*/}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 23.5C8.76313 23.5 4.5 19.2369 4.5 14C4.5 8.76313 8.76313 4.5 14 4.5C19.2369 4.5 23.5 8.76313 23.5 14C23.5 19.2369 19.2369 23.5 14 23.5ZM19.4506 8.75125L11.625 16.5769L8.54938 13.5131L6.875 15.1875L11.625 19.9375L21.125 10.4375L19.4506 8.75125Z" fill="#00AC14" />
          </svg>
          <div className="flex flex-col gap-1">
            {/*투두 내용*/}
            <div className="flex justify-center items-center gap-1">
              {todo.shared && <div className="font-medium px-1 rounded-sm bg-[#ffd4a3] border border-solid border-[#ffbe73]">공통</div>}
              <div className="font-bold text-base line-through">{todo.content}</div>
            </div>
            {/*완료 일자*/}
            {/*TODO : 날짜는 day js 설치되면 */}
            <div className="text-sm font-medium text-[#4d4d4d]">완료일시: {todo.completedAt ? new Date(todo.completedAt).toLocaleDateString() : "알 수 없음"}</div>
          </div>
        </div>
        {/* 노트 아이콘 + 더보기 아이콘 */}
        <Note note={todo.note} />
      </div>
    );
  }

  //진행중인 투두일때
  return (
    <div className="bg-white px-4 py-2 rounded-lg text-[#313131] flex justify-between items-center w-[469px] h-[76px]">
      <div className="flex justify-center items-center gap-2">
        {/*체크 박스*/}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="9" stroke="#898989" />
        </svg>
        <div className="flex flex-col">
          {/*투두 내용*/}
          <div className="flex justify-center items-center gap-1">
            {todo.shared && <div className="font-medium px-1 rounded-sm bg-[#ffd4a3] border border-solid border-[#ffbe73]">공통</div>}
            <div className="font-bold text-base">{todo.content}</div>
          </div>
          {/*생성 일자*/}
          {/* <div className="text-sm font-medium text-[#4d4d4d]">생성일시: {new Date(todo.createdAt).toLocaleDateString()}</div> */}
        </div>
      </div>
      {/* 노트 아이콘 + 더보기 아이콘 */}
      <Note note={todo.note} />
    </div>
  );
}

//노트 여부에 따라 2가지 아이콘 + 더보기 아이콘
function Note(props: { note: string }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {props.note ? (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.7331 24.6471H18.4706V18.4706H24.6471V7.7331C24.6471 7.62213 24.6114 7.53103 24.5402 7.45979C24.469 7.38856 24.3779 7.35294 24.2669 7.35294H7.7331C7.62213 7.35294 7.53103 7.38856 7.45979 7.45979C7.38856 7.53103 7.35294 7.62213 7.35294 7.7331V24.2669C7.35294 24.3779 7.38856 24.469 7.45979 24.5402C7.53103 24.6114 7.62213 24.6471 7.7331 24.6471ZM7.7331 26.5C7.1171 26.5 6.59087 26.2819 6.1544 25.8456C5.71813 25.4091 5.5 24.8829 5.5 24.2669V7.7331C5.5 7.1171 5.71813 6.59087 6.1544 6.1544C6.59087 5.71813 7.1171 5.5 7.7331 5.5H24.2669C24.8829 5.5 25.4091 5.71813 25.8456 6.1544C26.2819 6.59087 26.5 7.1171 26.5 7.7331V19.2664L19.2664 26.5H7.7331ZM10.3698 18.138V16.285H16V18.138H10.3698ZM10.3698 13.2206V11.3676H21.6302V13.2206H10.3698Z"
            fill="#1F1F1F"
          />
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.7331 24.6471H18.4706V18.4706H24.6471V7.7331C24.6471 7.62213 24.6114 7.53103 24.5402 7.45979C24.469 7.38856 24.3779 7.35294 24.2669 7.35294H7.7331C7.62213 7.35294 7.53103 7.38856 7.45979 7.45979C7.38856 7.53103 7.35294 7.62213 7.35294 7.7331V24.2669C7.35294 24.3779 7.38856 24.469 7.45979 24.5402C7.53103 24.6114 7.62213 24.6471 7.7331 24.6471ZM7.7331 26.5C7.1171 26.5 6.59087 26.2819 6.1544 25.8456C5.71813 25.4091 5.5 24.8829 5.5 24.2669V7.7331C5.5 7.1171 5.71813 6.59087 6.1544 6.1544C6.59087 5.71813 7.1171 5.5 7.7331 5.5H24.2669C24.8829 5.5 25.4091 5.71813 25.8456 6.1544C26.2819 6.59087 26.5 7.1171 26.5 7.7331V19.2664L19.2664 26.5H7.7331Z"
            fill="#AFAFAF"
          />
          <path d="M16.4 10H14.6V14H11V16H14.6V20H16.4V16H20V14H16.4V10Z" fill="#AFAFAF" />
        </svg>
      )}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.2307 17.5C9.81821 17.5 9.46513 17.3531 9.17146 17.0592C8.87763 16.7656 8.73071 16.4125 8.73071 16C8.73071 15.5875 8.87763 15.2344 9.17146 14.9408C9.46513 14.6469 9.81821 14.5 10.2307 14.5C10.6432 14.5 10.9964 14.6469 11.2902 14.9408C11.5839 15.2344 11.7307 15.5875 11.7307 16C11.7307 16.4125 11.5839 16.7656 11.2902 17.0592C10.9964 17.3531 10.6432 17.5 10.2307 17.5ZM16 17.5C15.5875 17.5 15.2344 17.3531 14.9407 17.0592C14.6469 16.7656 14.5 16.4125 14.5 16C14.5 15.5875 14.6469 15.2344 14.9407 14.9408C15.2344 14.6469 15.5875 14.5 16 14.5C16.4125 14.5 16.7655 14.6469 17.0592 14.9408C17.353 15.2344 17.5 15.5875 17.5 16C17.5 16.4125 17.353 16.7656 17.0592 17.0592C16.7655 17.3531 16.4125 17.5 16 17.5ZM21.7692 17.5C21.3567 17.5 21.0035 17.3531 20.7097 17.0592C20.416 16.7656 20.2692 16.4125 20.2692 16C20.2692 15.5875 20.416 15.2344 20.7097 14.9408C21.0035 14.6469 21.3567 14.5 21.7692 14.5C22.1817 14.5 22.5348 14.6469 22.8285 14.9408C23.1223 15.2344 23.2692 15.5875 23.2692 16C23.2692 16.4125 23.1223 16.7656 22.8285 17.0592C22.5348 17.3531 22.1817 17.5 21.7692 17.5Z"
          fill="#AFAFAF"
        />
      </svg>
    </div>
  );
}