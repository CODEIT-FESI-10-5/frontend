'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils/cn';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    // 히스토리가 있으면 뒤로가기, 없으면 홈으로 이동
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-surface-4 flex min-h-screen w-full flex-col items-center justify-center px-20">
      {/* 404 이미지 */}
      <div className="mb-40">
        <Image
          src="/images/404.png"
          alt="404 Error"
          width={400}
          height={300}
          style={{ height: 'auto', width: 'auto' }}
          className="max-w-[300px] sm:max-w-[400px]"
        />
      </div>

      {/* 404 메인 콘텐츠 */}
      <div className="flex flex-col items-center text-center">
        {/* 메시지 */}
        <div className="mb-40">
          <h2
            className={cn(
              'mb-12 font-bold text-white',
              'text-[20px]',
              'sm:text-[24px]',
            )}
          >
            페이지를 찾을 수 없습니다
          </h2>
          <p
            className={cn(
              'font-normal text-[#adb5bd]',
              'text-[14px] leading-relaxed',
              'sm:text-[16px]',
            )}
          >
            요청하신 페이지가 존재하지 않거나
            <br />
            일시적으로 사용할 수 없습니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex w-full flex-col gap-12 sm:flex-row sm:justify-center sm:gap-16">
          <button
            onClick={handleGoBack}
            className={cn(
              'bg-primary transition-colors duration-200 hover:bg-[#6c79e8]',
              'rounded-lg px-32 py-16 font-medium text-white',
              'text-[14px] sm:text-[16px]',
              'w-full sm:w-auto sm:min-w-[378px]',
            )}
          >
            뒤로가기
          </button>
        </div>
      </div>

      {/* 하단 설명 */}
      {/* <p
        className={cn(
          'mt-60 text-center font-normal text-[#6c757d]',
          'text-[12px]',
          'sm:text-[14px]',
        )}
      >
        문제가 지속될 경우 관리자에게 문의해주세요.
      </p> */}
    </div>
  );
}
