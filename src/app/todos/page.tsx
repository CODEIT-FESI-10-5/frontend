export default function TodosPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">할 일 목록</h1>
      <div className="mb-6">
        {/* Todo 필터 컴포넌트가 들어갈 예정 */}
        <p className="text-gray-600">필터 옵션이 여기에 표시됩니다</p>
      </div>
      <div>
        {/* Todo 리스트 컴포넌트가 들어갈 예정 */}
        <p className="text-gray-600">할 일 목록이 여기에 표시됩니다</p>
      </div>
    </div>
  );
}
