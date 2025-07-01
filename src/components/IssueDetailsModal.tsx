import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Issue } from "@/lib/types"; // update with your correct type
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

const assignees = ["alice@example.com", "bob@example.com", "carol@example.com"];

export default function IssueDetailsModal({
  open,
  onClose,
  issue,
  onUpdated,
}: {
  open: boolean;
  onClose: () => void;
  issue: Issue;
  onUpdated: () => void;
}) {
  const [assignee, setAssignee] = useState(issue.assignee);

  const handleChangeAssignee = async (val: string) => {
    try {
      await apiClient.put(`/issues/${issue.id}/assign`, { assignee: val });
      setAssignee(val);
      onUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{issue.title}</DialogTitle>
          <DialogDescription>{issue.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            <strong>Status:</strong> {issue.status}
          </p>
          <p>
            <strong>Priority:</strong> {issue.priority}
          </p>
          <p>
            <strong>Created by:</strong> {issue.createdBy}
          </p>
          <div className="flex items-center gap-2">
            <strong>Assignee:</strong>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{assignee || "Unassigned"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {assignees.map((a) => (
                  <DropdownMenuItem
                    key={a}
                    onClick={() => handleChangeAssignee(a)}
                  >
                    {a}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
