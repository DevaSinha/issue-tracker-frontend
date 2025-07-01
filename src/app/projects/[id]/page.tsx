"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useIssues } from "@/hooks/useIssue";
import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { User, AlertCircle, Flag } from "lucide-react";
import CreateIssueModal from "@/components/CreateIssueModal";
import { Issue } from "@/lib/types";
import IssueDetailsModal from "@/components/IssueDetailsModal";

export default function ProjectDetailsPage() {
  const { id: projectId } = useParams();
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch } = useIssues(
    projectId as string,
    page
  );
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpenDetails = (issue: Issue) => {
    setSelectedIssue(issue);
    setDetailsOpen(true);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Issues</h1>
        <CreateIssueModal />
      </div>

      {isLoading && <Loader />}
      {isError && <p className="text-destructive">Failed to load issues.</p>}
      {!isLoading && !data?.data.length && (
        <p className="text-muted-foreground">No issues found.</p>
      )}

      <ul className="space-y-4">
        {data?.data.map((issue) => (
          <li
            key={issue.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            onClick={() => handleOpenDetails(issue)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  {issue.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Created by: {issue.createdBy}
                </p>
              </div>

              {issue.assignee && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {issue.assignee}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm">
              <Badge variant="outline" className="capitalize">
                {issue.status.toLowerCase()}
              </Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Flag className="w-4 h-4" />
                {issue.priority}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setPage((p) => (data && page + 1 < data.totalPages ? p + 1 : p))
          }
          disabled={!data || page + 1 >= data.totalPages}
        >
          Next
        </Button>
      </div>
      {selectedIssue && (
        <IssueDetailsModal
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          issue={selectedIssue}
          onUpdated={() => {
            refetch();
            setDetailsOpen(false);
          }}
        />
      )}
    </main>
  );
}
