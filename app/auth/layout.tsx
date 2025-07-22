import Image from 'next/image';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-surface-2 flex h-880 w-1306 items-center justify-center">
        <AuthIntro />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex h-full w-442 flex-col gap-60">
            <div className="flex flex-col gap-28">
              <Image
                src="/images/logo.png"
                width={153}
                height={36}
                alt="logo"
              />
              <div>
                <h1 className="headline-large text-text-white">
                  슬리드 투두에 오신걸 환경합니다!
                </h1>
                <p className="text-text-secondary label-large">
                  혼자보다 함께. 슬리드투두로 팀의 스터디 상황을 공유하세요.
                </p>
              </div>
            </div>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthIntro() {
  return (
    <div className="bg-tertiary hidden h-848 w-629 flex-col items-center md:flex">
      <div className="mt-154 h-287 w-548 bg-gray-300"></div>
    </div>
  );
}
