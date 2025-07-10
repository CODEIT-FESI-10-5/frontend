export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">프로필 정보</h2>
          {/* 프로필 폼 컴포넌트가 들어갈 예정 */}
          <p className="text-gray-600">프로필 정보가 여기에 표시됩니다</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">계정 설정</h2>
          {/* 계정 설정 컴포넌트가 들어갈 예정 */}
          <p className="text-gray-600">계정 설정이 여기에 표시됩니다</p>
        </div>
      </div>
    </div>
  );
}
