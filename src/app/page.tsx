import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Dashboard Project
        </h1>
        <p className="text-gray-600 text-center mb-8">
          MSW를 활용한 대시보드 프로젝트
        </p>
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center block"
          >
            대시보드로 이동
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              MSW로 모킹된 API를 사용한 대시보드를 확인해보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
