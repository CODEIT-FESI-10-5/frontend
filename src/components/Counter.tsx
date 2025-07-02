import { useAppStore } from "@/store/appStore";

export default function Counter() {
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>
      <div className="flex gap-2">
        <button onClick={increment} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          +
        </button>
        <button onClick={decrement} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          -
        </button>
        <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  );
}
