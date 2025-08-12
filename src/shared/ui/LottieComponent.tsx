'use client';

import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieComponentProps {
  animationData: object; // Lottie JSON 파일
  loop?: boolean;
  width: number;
  height: number;
}

export default function LottieComponent({
  animationData,
  loop = true,
  width,
  height,
}: LottieComponentProps) {
  const container = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem>(null);
  useEffect(() => {
    if (!container.current) return;

    const instance = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop,
      autoplay: true,
      animationData,
      rendererSettings: {
        // 'meet'는 전체가 보이도록 맞춤(레터박스), 'slice'는 잘라서 채움.
        preserveAspectRatio: 'none',
      },
    });
    animRef.current = instance;
    const forceSvgSize = () => {
      const svg = container.current?.querySelector('svg') as SVGElement | null;
      if (svg) {
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block'; // inline-svg 여백 제거
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      } else {
        // SVG가 아직 없으면 다음 animation frame에서 재시도
        requestAnimationFrame(forceSvgSize);
      }
    };
    forceSvgSize();

    return () => {
      instance.destroy();
    };
  }, [animationData, loop]);
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    display: 'inline-block',
  };
  return <div ref={container} style={style} />;
}
