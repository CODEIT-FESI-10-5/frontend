export default function NotesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">노트 모아보기</h1>
      <div className="mb-6">
        {/* 노트 검색 컴포넌트가 들어갈 예정 */}
        <p className="text-gray-600">검색 옵션이 여기에 표시됩니다</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 노트 카드 컴포넌트들이 들어갈 예정 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">노트 제목</h3>
          <p className="text-gray-600">노트 미리보기가 여기에 표시됩니다</p>
        </div>
      </div>
    </div>
  );
}
