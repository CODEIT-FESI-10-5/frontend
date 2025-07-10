interface TodoDetailPageProps {
  params: {
    id: string;
  };
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">할 일 상세</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">Todo ID: {params.id}</p>
        {/* Todo 상세 정보 컴포넌트가 들어갈 예정 */}
        <p className="text-gray-600">할 일 상세 정보가 여기에 표시됩니다</p>
      </div>
    </div>
  );
}
