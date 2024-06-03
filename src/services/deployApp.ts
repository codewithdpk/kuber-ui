import instance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

interface DeployAppPayload {
  namespace: string;
  applicationName: string;
}

async function deployApp(payload: DeployAppPayload) {
  const res = await instance.post("/apps/deploy", payload);

  if (res.status === 200 || res.status === 201) {
    return res.data;
  }

  return null;
}

export function useDeployApp() {
  return useMutation({
    mutationFn: (payload: DeployAppPayload) => deployApp(payload),
  });
}
