"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/lib/useAuth";
import CreateProjectModal from "@/components/CreateProjectModal";
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderKanban,
  FileText,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Loader from "@/components/Loader";
import ErrorFallback from "@/components/ErrorFallback";
import Link from "next/link";

export default function DashboardPage() {
  const { isAuthenticated, logout } = useAuth();
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch } = useProjects(page, 5);

  if (!isAuthenticated) return null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <CreateProjectModal onCreated={refetch} />
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {data?.totalElements ?? "-"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Page</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {data ? Number(data.page) + 1 : "-"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <BookMarked className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{data?.totalPages ?? "-"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-2xl shadow p-6 space-y-4">
        {isLoading && <Loader />}
        {isError && <ErrorFallback />}

        {/* {!isLoading && !data?.data.length && (
          <p className="text-muted-foreground">No projects found.</p>
        )} */}

        <ul className="grid gap-4">
          {data?.data.map((proj: Project) => (
            <li
              key={proj.id}
              className="rounded-xl border bg-background p-4 shadow-sm hover:shadow-md transition"
            >
              <Link href={`/projects/${proj.id}`}>
                <h2 className="text-lg font-semibold text-primary">
                  {proj.name}
                </h2>
              </Link>
              <p className="text-sm text-muted-foreground">
                {proj.description}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Created by: {proj.createdBy}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
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
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </main>
  );
}
