'use client';
import { useGetProfileQuery } from '@/features/getProfile/model';

export default function Profile() {
  const { isLoading, data, error } = useGetProfileQuery();
  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>오류발생</div>;
  return (
    <div className="bg-surface-4 rounded-6 flex h-79 w-full items-center gap-13 px-14 py-12">
      <div className="rounded-100 bg-text-tertiary h-55 w-55">
        {data?.image ? <img src={data.image} /> : <div />}
      </div>
      <div className="h-43">
        <p className="body-large text-text-secondary">{data?.name}</p>
        <p className="label-small text-text-secondary">{data?.email}</p>
      </div>
    </div>
  );
}
