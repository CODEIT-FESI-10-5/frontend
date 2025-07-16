import type { Metadata } from 'next';
import { Noto_Sans_KR, Roboto } from 'next/font/google';
import { QueryProvider } from '../src/app/query-provider';
import { MswProvider } from '../src/app/msw-provider';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Slid to do',
  description: '코드잇 프론트엔드 단기 심화 과정 10기 5조 프로젝트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${roboto.variable} antialiased`}>
        <MswProvider>
          <QueryProvider>{children}</QueryProvider>
        </MswProvider>
      </body>
    </html>
  );
}
