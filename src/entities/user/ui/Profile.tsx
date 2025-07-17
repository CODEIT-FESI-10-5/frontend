'use client';
import { useGetProfileQuery } from '@/features/sidebar/profile/model/useProfileQuery';

export default function Profile() {
  const { isLoading, data, error } = useGetProfileQuery();
  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>오류발생</div>;
  return (
    <div className="bg-surface-4 h-79 w-full">
      <div>{data?.image ? <img src={data.image} /> : <div />}</div>
      <div>
        <p className="body-large text-text-secondary">{data?.name}</p>
        <p className="label-small text-text-secondary">{data?.email}</p>
      </div>
    </div>
  );
}
