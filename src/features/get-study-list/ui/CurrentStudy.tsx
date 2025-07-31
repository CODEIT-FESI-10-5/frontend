import { StudyItem } from '@/entities/study/model';
import DropDownIcon from '@/assets/dropdown.svg';
import DropUpIcon from '@/assets/dropup.svg';
import { cn } from '@/shared/utils/cn';

interface CurrentStudyProps {
  isOpen: boolean;
  onClick: () => void;
  currentStudy: StudyItem | null;
}

export default function CurrentStudy({
  isOpen,
  onClick,
  currentStudy,
}: CurrentStudyProps) {
  return (
    <section className="flex flex-col gap-14">
      <h2 className="text-text-secondary title-small">현재 스터디</h2>
      {currentStudy !== null && (
        <div
          onClick={onClick}
          className={cn(
            'bg-surface-4 rounded-6 border-border-default flex h-108 w-full items-center gap-12 border-1 p-16',
            isOpen && 'border-primary border-1',
          )}
        >
          <div className="flex h-full w-232 flex-col gap-12">
            <h3 className="text-text-secondary title-small">
              {currentStudy?.title}
            </h3>
            <p className="text-text-secondary label-small">
              {currentStudy?.description}
            </p>
          </div>
          {isOpen ? <DropUpIcon /> : <DropDownIcon />}
        </div>
      )}
    </section>
  );
}
