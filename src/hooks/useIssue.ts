import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse, Issue } from "@/lib/types";

export function useIssues(projectId: string, page = 0, size = 10) {
  return useQuery({
    queryKey: ['issues', projectId, page],
    queryFn: () =>
      fetcher<PaginatedResponse<Issue>>({
        url: `/projects/${projectId}/issues`,
        params: { page, size },
      }),
  });
}
