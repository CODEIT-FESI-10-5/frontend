import type { Dashboard } from "../../../entities/dashboard";

export default function TeamProgress({ dashboard }: { dashboard: Dashboard }) {
  const teamProgress = dashboard.studyGoal.teamProgress;
  // const code = dashboard.studyGoal.
  return <div>팀 진행도 기본 구조</div>;
}
