'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui';
// import { useRedirect } from '@/shared/lib/utils/useRedirect';
// import { clientFetch } from '@/shared/api';

const images = [
  '/images/guide/guide_1.png',
  '/images/guide/guide_2.png',
  '/images/guide/guide_3.png',
];

const mobileImages = [
  '/images/guide/m_guide_1.png',
  '/images/guide/m_guide_2.png',
  '/images/guide/m_guide_3.png',
];

const content = [
  {
    title: '공통 투두와 나의 투두를 한눈에 관리',
    description:
      '스터디 목표를 위해 공통 투두를 세우고,\n개인 진도도 한 곳에서 관리해요.',
    desktopDescription:
      '스터디 목표를 위해 공통 투두를 세우고, 개인 진도도 한 곳에서 관리해요.',
  },
  {
    title: '스터디 목표를 정하고 함께 진도 나가기',
    description:
      '같은 목표를 갖고 함께 진도를 나가요.\n팀원과 달성률을 공유하며 동기부여를 받을 수 있어요.',
    desktopDescription:
      '같은 목표를 갖고 함께 진도를 나가요.\n팀원과 달성률을 공유하며 동기부여를 받을 수 있어요.',
  },
  {
    title: '공부 내용을 나만의 노트로 저장',
    description: '투두별로 노트를 작성할 수 있습니다.\n언제든 다시 복습하세요!',
    desktopDescription:
      '투두별로 노트를 작성할 수 있습니다. 언제든 다시 복습하세요!',
  },
];

export default function Guide() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [slideDirection, setSlideDirection] = useState(0);
  //const [loading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [authChecked, setAuthChecked] = useState(false);

  // // 로그인 상태 확인
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await clientFetch.get('/api/auth/check');
  //       setIsLoggedIn(true);
  //     } catch (error) {
  //       console.error('Auth check failed:', error);
  //     } finally {
  //       setAuthChecked(true);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  // // 로그인 상태가 확인된 후에만 useRedirect 활성화
  // const url = useRedirect('study', undefined, isLoggedIn && authChecked);

  // useEffect(() => {
  //   // 인증 확인이 완료되지 않았으면 대기
  //   if (!authChecked) return;

  //   // 로그인되어 있고 url이 있을 때만 리다이렉트 실행
  //   if (isLoggedIn && url) {
  //     router.replace(url);
  //     return; // url이 있으면 리다이렉트하고 loading 상태 유지
  //   }

  //   // 로그인되지 않았거나 (로그인되었지만 url이 로딩완료된 경우) 로딩 상태 해제
  //   if (!isLoggedIn || (isLoggedIn && url !== undefined)) setLoading(false);
  // }, [url, router, isLoggedIn, authChecked]);

  // 자동 슬라이드 기능 - 5초마다 다음 이미지로 넘어감
  // current가 변경될 때마다 타이머 리셋
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5초 간격

    return () => clearInterval(interval);
  }, [current]); // current가 변경될 때마다 타이머 리셋

  // 슬라이드 애니메이션 설정
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  // 슬라이드 페이지네이션 함수
  const paginate = (newDirection: number) => {
    setSlideDirection(newDirection);
    setCurrent((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % images.length;
      } else {
        return (prev - 1 + images.length) % images.length;
      }
    });
  };

  // 도트 클릭 핸들러
  const handleDotClick = (idx: number) => {
    const direction = idx > current ? 1 : -1;
    setSlideDirection(direction);
    setCurrent(idx);
  };

  // 드래그 종료 핸들러
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 50;
    const velocityThreshold = 500;

    if (
      (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) &&
      current < images.length - 1
    ) {
      paginate(1);
    } else if (
      (info.offset.x > threshold || info.velocity.x > velocityThreshold) &&
      current > 0
    ) {
      paginate(-1);
    }
  };

  // if (loading) {
  //   return <>logding</>;
  // }

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[#3e4044]',
        'p-20',
        'sm: sm:m-30 sm:max-h-[822px] sm:max-w-[1046px] sm:justify-between sm:rounded-lg sm:p-25',
      )}
    >
      {/* 로고 */}
      <div
        className={cn(
          `flex w-full`,
          'mb-60 justify-center',
          'sm:mb-0 sm:justify-start',
        )}
      >
        <Image
          src="/images/logo.png"
          alt="Modudo"
          width={100}
          height={40}
          style={{ height: 'auto', width: 'auto' }}
          className={cn()} // 향후 반응형 필요시 cn 사용
        />
      </div>
      {/* 메인 텍스트 + 이미지 슬라이드 */}
      <div className="w-full sm:w-[600px]">
        <div
          className={cn(
            'flex w-full flex-col items-center',
            'gap-20',
            'sm:gap-0',
          )}
        >
          {/* 텍스트 */}
          <div
            className={cn(
              'relative flex min-h-[90px] w-full items-center justify-center overflow-hidden text-center',
              '',
              '',
            )}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
              custom={slideDirection}
            >
              <motion.div
                key={current}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-12"
              >
                <h1
                  className={cn(
                    'leading-tight font-bold text-white',
                    'm-headline-large',
                    'sm:text-[28px]',
                  )}
                >
                  {content[current].title}
                </h1>
                <p
                  className={cn(
                    'text-text-primary font-normal whitespace-pre-line',
                    'm-body-small text-balance',
                    'sm:text-base',
                  )}
                >
                  {/* 모바일: description, 데스크탑: desktopDescription */}
                  <span className={cn('block sm:hidden')}>
                    {content[current].description}
                  </span>
                  <span className={cn('hidden sm:inline')}>
                    {content[current].desktopDescription}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* 이미지 슬라이드 */}
          <div className="relative w-full">
            <div className={cn('h-[355px] sm:h-[400px]')}>
              <motion.div
                className="h-full w-full cursor-grab overflow-hidden rounded-xl active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: 'grabbing' }}
              >
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={current}
                    custom={slideDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* 데스크탑용 이미지 */}
                    <Image
                      src={images[current]}
                      alt={`guide_${current + 1}`}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className={cn(
                        'pointer-events-none object-contain select-none',
                        'hidden sm:block lg:block',
                      )}
                      priority
                      draggable={false}
                    />
                    {/* 모바일용 이미지 */}
                    <Image
                      src={mobileImages[current]}
                      alt={`m_guide_${current + 1}`}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className={cn(
                        'pointer-events-none object-contain select-none',
                        'block sm:hidden',
                      )}
                      priority
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
            {/* 도트 인디케이터 */}
            <div className="absolute left-1/2 flex -translate-x-1/2 justify-center gap-10 sm:bottom-20">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={cn(
                    'h-10 w-10 rounded-full transition-all duration-300',
                    current === idx
                      ? 'bg-[#D9D9D9]'
                      : 'bg-[#555555] opacity-40',
                  )}
                  onClick={() => handleDotClick(idx)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`슬라이드 ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div
        className={cn(
          'flex w-full items-center justify-center gap-16',
          'mt-70 flex-col',
          'sm:mt-0 sm:mb-50 sm:flex-row',
        )}
      >
        <Button
          label="로그인하고 시작하기"
          size="lg"
          theme="primary"
          className="w-full flex-1 text-white sm:max-w-[442px]"
          onClick={() => router.push('/auth/login')}
        >
          로그인하고 시작하기
        </Button>
      </div>
    </div>
  );
}
