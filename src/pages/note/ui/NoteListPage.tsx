'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useNotesByStudyGoalId } from '@/entities/note/api/noteQueries';
import { NoteList } from '@/widgets/note-list';
import { useGetGoal } from '@/entities/goal/model/useGetGoal';
import { useStudyStore } from '@/features/get-study-list/model';
import { useGoalStore } from '@/features/get-goal-list/model';
import { useEffect } from 'react';
import AppBar from '@/shared/ui/AppBar';
import RouterBackButton from '@/shared/ui/RouterBackButton';
import IconBack3 from '@/assets/icon-back3.svg';

export function NoteListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // useStudyStore에서 현재 스터디 아이디를 가져옴
  const { currentStudyId } = useStudyStore();

  // useGoalStore에서 현재 목표 아이디를 가져옴
  const { setGoalId } = useGoalStore();

  const goalIdParam = searchParams?.get('goalId');
  const hasGoalId = goalIdParam !== null;

  // 목표 목록 가져오기
  const { data: goalData } = useGetGoal(Number(currentStudyId));

  // goalId가 없고 목표가 있을 때 첫 번째 목표로 자동 이동
  useEffect(() => {
    if (!hasGoalId && goalData && goalData.goals.length > 0) {
      const firstGoalId = goalData.goals[0].id;
      setGoalId(String(firstGoalId));
      router.replace(`/note?goalId=${firstGoalId}`);
    }
  }, [hasGoalId, goalData, router, setGoalId]);

  const { data: notesResponse, isLoading, isError } = useNotesByStudyGoalId();

  const notes = notesResponse?.data?.notes || [];
  const studyGoalTitle = notesResponse?.data?.studyGoalTitle || '';

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
      <AppBar pageName="노트 모아보기" />
      <div className="mb-18 hidden xl:block">
        <RouterBackButton>
          <IconBack3 />
        </RouterBackButton>
      </div>

      <div className="xl:bg-surface-1 xl:border-border-subtle w-full max-w-[1208px] rounded-lg xl:border">
        <div className="border-border-subtle hidden border px-22 py-12 xl:block">
          <h1 className="text-text-tertiary headline-medium text-lg">
            노트 모아보기
          </h1>
        </div>
        <div className="px-16 py-70 xl:px-30 xl:py-34">
          {hasGoalId ? (
            <NoteList title={studyGoalTitle} notes={notes} />
          ) : (
            <div className="py-12 text-center">
              <div className="mb-4 text-gray-500">생성된 목표가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
