import { StudyItem } from '@/entities/study/model';
import DropDownIcon from '@/assets/dropdown.svg';
import DropUpIcon from '@/assets/dropup.svg';

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
      {currentStudy !== null ? (
        <div
          onClick={onClick}
          className="bg-surface-4 rounded-6 border-border-default hover:border-primary flex h-108 w-full items-center gap-12 border-1 p-16"
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
      ) : (
        <p className="text-text-secondary label-small">스터디가 없습니다.</p>
      )}
    </section>
  );
}
