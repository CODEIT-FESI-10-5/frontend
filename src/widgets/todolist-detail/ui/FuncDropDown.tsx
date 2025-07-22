interface DropDownProps {
  items: Array<{ name: string; handleClick: () => void }>;
}

export default function FuncDropDown({ items }: DropDownProps) {
  return (
    <div className="absolute top-1/2 right-1/2 z-10 flex flex-col overflow-hidden rounded-lg bg-white shadow-xl/35">
      {items.map((item, idx) => (
        <button
          key={idx.toString() + item.name}
          className="cursor-pointer items-center justify-center px-24 py-12 whitespace-nowrap transition hover:bg-gray-200"
          onClick={item.handleClick}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
