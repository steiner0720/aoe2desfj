import useSWRImmutable from "swr/immutable";

import { fetcher } from "@/lib/fetcher";

const useAdmins = () => {
  return useSWRImmutable<AdminType[]>("/api/admins", fetcher);
};

export default useAdmins;
