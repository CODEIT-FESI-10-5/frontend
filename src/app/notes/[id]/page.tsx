interface NoteDetailPageProps {
  params: {
    id: string;
  };
}

export default function NoteDetailPage({ params }: NoteDetailPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">노트 상세보기</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">Note ID: {params.id}</p>
        {/* 노트 뷰어 컴포넌트가 들어갈 예정 */}
        <p className="text-gray-600">노트 내용이 여기에 표시됩니다</p>
      </div>
    </div>
  );
}
