'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { NoteCard } from '@/features/get-note/ui/NoteCard';
import { useNotesByStudyGoalId } from '@/features/get-note/api/getNoteQueries';
import NoteListPageIcon from '@/assets/note-list-page-icon.svg';
// 임시 사이드바 데이터
const studyGoals = [
  { id: 1, title: '프론트엔드 기초' },
  { id: 2, title: 'React & Next.js' },
  { id: 3, title: '백엔드 기초' },
  { id: 4, title: '데이터베이스' },
];

export function NoteListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const hasStudyGoalId = searchParams.get('studyGoalId') !== null;
  const {
    data: notesData,
    isLoading,
    isError,
  } = useNotesByStudyGoalId(hasStudyGoalId);

  useEffect(() => {
    const urlStudyGoalId = Number(searchParams.get('studyGoalId'));
    if (urlStudyGoalId && urlStudyGoalId !== selectedGoalId) {
      setSelectedGoalId(urlStudyGoalId);
    }
  }, [searchParams, selectedGoalId]);

  const notes = notesData?.notes || [];

  const handleGoalClick = (goalId: number) => {
    setSelectedGoalId(goalId);
    router.push(`/note?studyGoalId=${goalId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 bg-red-500">
        {/* 목표별 버튼 - 사이드바 임시 컴포넌트 */}
        <div className="mb-6 flex flex-wrap gap-3 bg-blue-500">
          {studyGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalClick(goal.id)}
              className={`cursor-pointer rounded-lg px-4 py-2 font-medium transition-colors ${
                selectedGoalId === goal.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-200'
              }`}
            >
              {goal.title}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">
            노트 목록을 불러오는 중...
          </div>
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-red-800">오류</h2>
          <p className="text-red-600">{isError}</p>
        </div>
      )}

      {/* 학습 목표를 선택했을 때 */}
      {!isLoading && !isError && hasStudyGoalId && (
        <div>
          <div className="flex items-center gap-10">
            <NoteListPageIcon />
            <span className="text-xl font-bold text-white">
              {studyGoals.find((goal) => goal.id === selectedGoalId)?.title}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-lg text-gray-500">
                아직 작성된 노트가 없습니다.
              </div>
              <p className="text-gray-400">첫 번째 노트를 작성해보세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 학습 목표를 선택하지 않았을 때 */}
      {!isLoading && !isError && !hasStudyGoalId && (
        <div className="py-12 text-center">
          <div className="mb-4 text-lg text-gray-500">
            위의 버튼 중 하나를 클릭해 학습 목표를 선택하여 노트를 확인하세요.
          </div>
        </div>
      )}
    </div>
  );
}
