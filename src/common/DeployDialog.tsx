import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDeployment } from "@/context/DeploymentContext";
import { useDeployApp } from "@/services/deployApp";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export function DeployDialog() {
  const { isDialogOpen, setIsDialogOpen } = useDeployment();

  const [namespace, setNamespace] = useState("default");

  const [applicationName, setApplicationName] = useState("");

  const { mutate, isPending, data } = useDeployApp();

  function handleDeploySideEffect() {
    setIsDialogOpen(false);
  }

  useEffect(() => {
    if (data) {
      handleDeploySideEffect();
    }
  }, [data]);


  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deploy Application </DialogTitle>
          <DialogDescription>
            Provide the details relavent to the deployment
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Namespace
            </Label>
            <Input
              id="name"
              value={namespace}
              onChange={(e) => setNamespace(e?.target?.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Application Name
            </Label>
            <Input
              id="username"
              placeholder="my-app"
              value={applicationName}
              onChange={(e) => setApplicationName(e?.target?.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => mutate({ namespace, applicationName })}
          >
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Deploy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
