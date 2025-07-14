import Dashboard from "@/features/dashboard/Dashboard";
import StudyGroup from "@/features/dashboard/StudyGroup";

export default function DashboardPage() {
  return (
    <>
      <div className="m-5 bg-[#171717]">
        <StudyGroup></StudyGroup>
        <Dashboard></Dashboard>
      </div>
    </>
  );
}
