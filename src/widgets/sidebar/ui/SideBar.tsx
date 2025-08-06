'use client';
import { motion, AnimatePresence } from 'framer-motion';
import SideBarInfo from '@/widgets/sidebar/ui/SideBarInfo';
import SideBarNav from './SideBarNav';
import { useDrawerStore } from '@/shared/model';
import { cn } from '@/shared/utils/cn';

export default function SideBar() {
  const { isOpen, close } = useDrawerStore();

  return (
    <>
      {/* 데스크탑 UI */}
      <div className="bg-surface-2 fixed left-0 hidden h-auto min-h-screen w-348 flex-col gap-64 overflow-y-scroll p-26 xl:flex">
        <SideBarInfo />
        <SideBarNav />
      </div>

      {/* 모바일 UI */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-10 bg-black/40 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              key="sidebar"
              className={cn(
                'bg-surface-2 scrollbar-hide fixed top-0 bottom-0 left-0 z-20 flex w-335 gap-64 overflow-y-scroll p-18 not-first-of-type:flex-col xl:w-348 xl:p-26',
              )}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2 }}
            >
              <SideBarInfo />
              <SideBarNav />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
