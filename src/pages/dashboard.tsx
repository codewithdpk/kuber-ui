import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetApps } from "@/services/getApps";
import { useDeployment } from "@/context/DeploymentContext";
import { DeployDialog } from "@/common/DeployDialog";
import { useEffect } from "react";

export default function Component() {
  const { data, isLoading, refetch } = useGetApps();

  const { isDialogOpen, setIsDialogOpen } = useDeployment();

  function handleOpenDeployment() {
    setIsDialogOpen(true);
  }

  useEffect(() => {
    if (isDialogOpen) {
      refetch();
    }
  }, [isDialogOpen]);

  return (
    <div className="container mx-auto flex justify-center items-center pt-24">
      <Card className="min-w-[80%]">
        <CardHeader className="relative">
          <CardTitle>Deployments</CardTitle>
          <CardDescription>
            Manage and view your helm chart deployments.
          </CardDescription>

          <Button className="absolute right-6" onClick={handleOpenDeployment}>
            Deploy New{" "}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application Name</TableHead>
                <TableHead>Running Status</TableHead>
                <TableHead>Namespace</TableHead>
                <TableHead className="hidden md:table-cell">Pods</TableHead>
                <TableHead className="hidden md:table-cell">
                  View Logs
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Deployed At
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.length &&
                data.map((app) => {
                  return (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">
                        {app.applicationName}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{app.healthStatus}</Badge>
                      </TableCell>
                      <TableCell>{app.nameSpace}</TableCell>
                      <TableCell>{app.pods.length}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Button variant="link"> View</Button>{" "}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">-</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>

      <DeployDialog />
    </div>
  );
}
