export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="bg-surface-2 flex h-880 w-1306 items-center justify-center">
        <div className="bg-tertiary flex h-848 w-629 flex-col items-center">
          <div className="mt-154 h-287 w-548 bg-gray-300"></div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex h-full w-442 flex-col">
            <h1 className="headline-large text-text-white">
              슬리드 투두에 오신걸 환경합니다!
            </h1>
            <p className="text-text-secondary label-large">
              혼자보다 함께. 슬리드투두로 팀의 스터디 상황을 공유하세요.
            </p>
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
