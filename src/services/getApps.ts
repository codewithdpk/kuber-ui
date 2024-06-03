import instance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface App {
  id: number;
  nameSpace: string;
  applicationName: string;
  healthStatus: string;
  deployedAt: Date;
  pods: { name: string; namespace: string } [];
}

async function getApps() {
  const res = await instance.get("/apps");

  if (res.status === 200 || res.status === 201) {
    return res.data;
  }

  return null;
}

export function useGetApps() {
  return useQuery<App[]>({ queryKey: ["getApps"], queryFn: () => getApps() });
}
