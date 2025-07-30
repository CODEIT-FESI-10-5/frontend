'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { clientFetch } from '@/shared/api';
import { useRouter } from 'next/navigation';
import { useCreateStudy } from '@/features/create-study/model';
import JoinStudyModal from '@/features/join-study/ui/JoinStudyModal';
import { useModal } from '@/shared/lib/utils/useModal';

const images = [
  '/images/home-1.png',
  '/images/home-2.png',
  '/images/home-3.png',
];

const content = [
  {
    title: '공통 투두와 나의 투두를 한눈에 관리',
    description:
      '스터디 목표를 위해 공통 투두를 세우고, 개인 진도도 한 곳에서 관리해요.',
  },
  {
    title: '스터디 목표를 정하고 함께 진도 나가기',
    description:
      '같은 목표를 갖고 함께 진도를 나가요. 팀원과 달성률을 공유하며 동기부여를 받을 수 있어요.',
  },
  {
    title: '공부 내용을 나만의 노트로 저장',
    description: '투두별로 노트를 작성할 수 있습니다. 언제든 다시 복습하세요!',
  },
];

export default function Guide() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const { open } = useModal();

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

  const [slideDirection, setSlideDirection] = useState(0);

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

  const handleDotClick = (idx: number) => {
    const direction = idx > current ? 1 : -1;
    setSlideDirection(direction);
    setCurrent(idx);
  };

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
  const mutation = useCreateStudy((data) => {
    router.push(`/dashboard/${data.newStudyId}`);
  });

  // 스터디 만들기 핸들러
  const handleStudyCreate = async () => {
    try {
      await clientFetch.get('/api/auth/check');
      // 성공적으로 인증된 경우
      console.log('스터디 만들기 가능');
      mutation.mutate();
    } catch {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      router.push('/auth/login');
    }
  };

  // 초대코드로 참여하기 핸들러
  const handleJoinStudy = async () => {
    try {
      await clientFetch.get('/api/auth/check');
      open(<JoinStudyModal />);
    } catch {
      // 인증되지 않은 경우 로그인 페이지로 리다이렉트
      router.push('/auth/login');
    }
  };

  return (
    <div className="flex h-[822px] w-[1046px] flex-col items-center justify-between rounded-lg bg-[#3e4044] px-25 py-25">
      {/* 로고 */}
      <div className="flex w-full justify-start">
        <Image
          src="/images/logo.png"
          alt="Modudo"
          width={100}
          height={40}
          style={{ height: 'auto', width: 'auto' }}
        />
      </div>

      <div>
        {/* 메인 텍스트 + 이미지 슬라이드 */}
        <div className="flex flex-col items-center">
          {/* 텍스트 */}
          <div className="relative flex min-h-[90px] w-[600px] items-center justify-center overflow-hidden text-center">
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
                <h1 className="text-[28px] leading-tight font-bold text-white">
                  {content[current].title}
                </h1>
                <p className="text-text-primary text-base font-normal">
                  {content[current].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* 이미지 슬라이드 */}
          <div className="relative">
            <div className="relative h-[400px] w-[600px]">
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
                    <Image
                      src={images[current]}
                      alt={`홈 예시 ${current + 1}`}
                      fill
                      sizes="(max-width: 600px) 100vw, 600px"
                      className="pointer-events-none object-contain select-none"
                      priority
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
            {/* 도트 인디케이터 */}
            <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 justify-center gap-10">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`h-10 w-10 rounded-full transition-all duration-300 ${
                    current === idx ? 'bg-[#D9D9D9]' : 'bg-[#555555] opacity-40'
                  }`}
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
      <div className="mb-50 flex w-full items-center justify-center gap-16">
        <motion.button
          className="title-small h-[96px] max-w-[331px] flex-1 cursor-pointer rounded-lg bg-[#6366f1] px-6 py-5 text-white transition-colors duration-200 hover:bg-[#5856eb]"
          whileTap={{ scale: 0.98 }}
          onClick={handleStudyCreate}
        >
          스터디 만들기 (팀장으로 시작)
        </motion.button>

        <motion.button
          className="title-small border-primary h-[96px] max-w-[331px] flex-1 cursor-pointer rounded-lg border px-6 py-5 text-white transition-colors duration-200 hover:bg-[#3a3a4a]"
          whileTap={{ scale: 0.98 }}
          onClick={handleJoinStudy}
        >
          초대코드로 참여하기
        </motion.button>
      </div>
    </div>
  );
}
