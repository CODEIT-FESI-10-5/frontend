'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Onboarding() {
  return (
    <div className="min-h-screen w-full rounded-lg text-white">
      {/* 데스크톱 버전 - 좌우 배치 */}
      <div className="hidden md:flex md:min-h-screen md:items-center md:justify-center md:px-16">
        <div className="flex max-w-6xl items-center gap-30">
          {/* 왼쪽: 텍스트와 버튼 */}
          <div className="flex-1">
            <div className="mb-48">
              <h1 className="text-32 leading-tight font-medium">
                가입한 스터디가 없습니다.
              </h1>
              <p className="text-18 text-[#B4B4B4]">
                스터디를 만들거나 코드를 입력해 가입해 보세요.
              </p>
            </div>

            <div className="flex flex-col gap-16">
              <Link href="/study/create">
                <button className="rounded-8 w-full bg-[#7C6EFF] px-48 py-16 text-white transition-colors hover:bg-[#6B5DFF]">
                  스터디 만들기 (팀장으로 시작)
                </button>
              </Link>
              <Link href="/study/join">
                <button className="rounded-8 w-full bg-[#3E4A7A] px-48 py-16 text-white transition-colors hover:bg-[#334066]">
                  초대코드로 가입하기
                </button>
              </Link>
            </div>
          </div>

          {/* 오른쪽: 이미지 */}
          <div className="flex flex-1 justify-center">
            <Image
              src="/images/onboarding.png"
              alt="온보딩 이미지"
              width={500}
              height={380}
            />
          </div>
        </div>
      </div>

      {/* 모바일 버전 - 상하 배치 (기존과 동일) */}
      <div className="flex min-h-screen flex-col items-center justify-center px-6 md:hidden">
        <div className="mb-32 text-center">
          <h1 className="text-20 mb-16 font-medium">
            가입한 스터디가 없습니다.
          </h1>
          <p className="text-[#B4B4B4]">
            스터디를 만들거나 코드를 입력해 가입해 보세요.
          </p>
        </div>

        <div className="mb-48">
          <Image
            src="/images/onboarding.png"
            alt="온보딩 이미지"
            width={280}
            height={220}
          />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-16">
          <Link href="/study/create" className="w-full">
            <button className="rounded-8 w-full bg-[#7C6EFF] px-24 py-16 text-white">
              스터디 만들기(팀장으로 시작)
            </button>
          </Link>
          <Link href="/study/join" className="w-full">
            <button className="rounded-8 w-full bg-[#3E4A7A] px-24 py-16 text-white">
              초대코드로 가입하기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
