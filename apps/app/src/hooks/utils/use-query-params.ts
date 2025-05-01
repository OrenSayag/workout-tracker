import { useSearchParams, useRouter } from 'next/navigation';

export const useQueryParams = () => {
  const router = useRouter();
  const currentParams = useSearchParams();
  const setQueryParams = (
    newParams: Record<string, string>,
    override = false
  ) => {
    const params = new URLSearchParams(override ? {} : currentParams);
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`?${params.toString()}`);
  };

  return { setQueryParams };
};
