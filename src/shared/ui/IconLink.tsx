import Link, { LinkProps } from 'next/link';
import { SVGProps } from 'react';

interface IconLinkProps extends LinkProps {
  IconName: React.FC<SVGProps<SVGSVGElement>>;
}

export default function IconLink({ href, IconName }: IconLinkProps) {
  return (
    <Link
      href={href}
      className="flex h-32 w-32 cursor-pointer items-center justify-center transition hover:scale-110"
    >
      <IconName />
    </Link>
  );
}
