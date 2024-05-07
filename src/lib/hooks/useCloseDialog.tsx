import { usePathname, useRouter } from 'next/navigation';

const useCloseDialog = () => {
  const router = useRouter();
  const pathName = usePathname();

  return () => router.replace(pathName as string, undefined);
};

export default useCloseDialog;
