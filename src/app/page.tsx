import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Slid To Do</h1>
          <p className="text-xl text-gray-600 mb-8">할 일과 노트를 효율적으로 관리하는 플랫폼</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              로그인
            </Link>
            <Link href="/signup" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              회원가입
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📝 할 일 관리</h3>
            <p className="text-gray-600">효율적인 할 일 관리와 진행 상황 추적</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📔 노트 작성</h3>
            <p className="text-gray-600">아이디어와 메모를 체계적으로 정리</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">📊 대시보드</h3>
            <p className="text-gray-600">한눈에 보는 생산성 통계와 분석</p>
          </div>
        </div>
      </div>
    </div>
  );
}
