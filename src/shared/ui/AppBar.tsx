'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useDrawerStore } from '@/widgets/sidebar/ui/model';
import BackIcon from '@/assets/icon-back2.svg';
import CloseIcon from '@/assets/icon-close.svg';
import MenuIcon from '@/assets/icon-menu.svg';
interface AppBarProps {
  pageName: string;
}

export default function AppBar({ pageName }: AppBarProps) {
  const { open } = useDrawerStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    //router.back();
    open();
  };

  const isNote = pathname === '/note';

  return (
    <>
      {isNote ? (
        <div className="relative flex h-54 w-full items-center justify-center xl:hidden">
          <MenuIcon className="absolute left-18 h-24 w-24" onClick={open} />
          <h1 className="text-text-white">{pageName}</h1>
          <CloseIcon
            className="absolute right-18 h-26 w-26"
            onClick={handleBack}
          />
        </div>
      ) : (
        <div className="relative flex h-54 w-full items-center justify-center xl:hidden">
          <BackIcon
            className="absolute left-18 h-24 w-24"
            onClick={handleBack}
          />
          <h1 className="text-text-white">{pageName}</h1>
        </div>
      )}
    </>
  );
}
