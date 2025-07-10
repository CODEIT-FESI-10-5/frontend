export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 대시보드 통계 컴포넌트들이 들어갈 예정 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">할 일 통계</h2>
          <p className="text-gray-600">통계 정보가 여기에 표시됩니다</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">최근 노트</h2>
          <p className="text-gray-600">최근 노트가 여기에 표시됩니다</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">빠른 작업</h2>
          <p className="text-gray-600">빠른 작업 버튼들이 여기에 표시됩니다</p>
        </div>
      </div>
    </div>
  );
}
