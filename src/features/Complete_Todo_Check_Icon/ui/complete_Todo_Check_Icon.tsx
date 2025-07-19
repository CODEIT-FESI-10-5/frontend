import CheckBlankIcon from '@/assets/check_blank.svg';
import CheckFillIcon from '@/assets/check_fill.svg';

export default function CompleteTodoCheckIcon({
  completed,
}: {
  completed: boolean;
}) {
  return completed ? (
    <CheckFillIcon width={28} height={28} />
  ) : (
    <CheckBlankIcon width={28} height={28} />
  );
}
