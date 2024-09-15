import { usePathname, useRouter } from "next/navigation";

const useDialog = () => {
  const { push, replace } = useRouter();
  const pathName = usePathname();

  const openDialog = (searchParam: string) => {
    const formatedSearchParam = `?${searchParam}=y`;
    push(pathName + formatedSearchParam);
  };

  const closeDialog = () => replace(pathName as string, undefined);

  return { open: openDialog, close: closeDialog };
};

export default useDialog;
