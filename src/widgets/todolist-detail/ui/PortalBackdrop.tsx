import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface PortalDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function PortalBackdrop({
  isOpen,
  onClose,
  children,
}: PortalDropdownProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          className="bg-surface-2 fixed inset-0"
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('portal-backdrop')!,
  );
}
