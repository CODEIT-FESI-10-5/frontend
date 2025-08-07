import Image from 'next/image';
import Link from 'next/link';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-2 md:bg-surface-1 flex h-full w-full max-w-screen items-start justify-center px-24 py-32 md:items-center md:p-0">
      <div className="md:bg-surface-2 rounded-12 flex w-327 flex-col items-start justify-center gap-28 overflow-y-auto md:h-auto md:w-642 md:px-100 md:py-68">
        <div className="relative h-24 w-94 md:h-36 md:w-153">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              fill
              className="object-contain"
            />
          </Link>
        </div>
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
