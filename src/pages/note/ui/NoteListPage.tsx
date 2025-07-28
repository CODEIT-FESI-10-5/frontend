'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { NoteCard } from '@/features/get-note/ui/NoteCard';
import { useNotesByStudyGoalId } from '@/features/get-note/api/getNoteQueries';
import NoteListPageIcon from '@/assets/note-list-page-icon.svg';

export function NoteListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const hasStudyGoalId = searchParams?.get('studyGoalId') !== null;
  const { data: notesResponse, isLoading, isError } = useNotesByStudyGoalId();

  useEffect(() => {
    const urlStudyGoalId = Number(searchParams?.get('studyGoalId'));
    if (urlStudyGoalId && urlStudyGoalId !== selectedGoalId) {
      setSelectedGoalId(urlStudyGoalId);
    }
  }, [searchParams, selectedGoalId]);

  const notes = notesResponse?.data?.notes || [];
  const studyGoalTitle = notesResponse?.data?.studyGoalTitle || '';

  // 목표 선택 핸들러 (임시)
  const studyGoals = [
    { id: 1, title: '프론트엔드 기초' },
    { id: 2, title: 'React & Next.js' },
    { id: 3, title: '백엔드 기초' },
    { id: 4, title: '데이터베이스' },
  ];

  const handleGoalClick = (goalId: number) => {
    setSelectedGoalId(goalId);
    router.push(`/note?studyGoalId=${goalId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-400">
            노트 목록을 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-red-700 bg-red-900/20 p-4">
            <h2 className="mb-2 text-lg font-semibold text-red-400">오류</h2>
            <p className="text-red-300">노트 목록을 불러오는데 실패했습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface-1 border-border-subtle max-w-[1208px] rounded-lg border">
        <div className="border-border-subtle border px-22 py-12">
          <h1 className="text-text-tertiary headline-medium text-lg">
            노트 모아보기
          </h1>
        </div>
        <div className="container mx-auto px-30 py-34">
          {hasStudyGoalId && (
            <>
              <div className="mb-24 flex items-center gap-4">
                <NoteListPageIcon />
                <h1 className="headline-large text-2xl text-white">
                  {studyGoalTitle}
                </h1>
              </div>

              {notes.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mb-4 text-lg text-gray-500">
                    아직 작성된 노트가 없습니다.
                  </div>
                </div>
              ) : (
                <div className="space-y-12">
                  {notes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </div>
              )}
            </>
          )}
          {!hasStudyGoalId && (
            <div className="py-12 text-center">
              <div className="mb-4 text-lg text-gray-500">
                학습 목표를 선택하여 노트를 확인하세요.
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 목표별 버튼 - 사이드바 임시 컴포넌트 */}
      <div className="mb-10 flex flex-wrap gap-3">
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
    </>
  );
}
