import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { PaginatedResponse, Project } from '@/lib/types';

export function useProjects(page = 0, size = 5) {
  return useQuery({
    queryKey: ['projects', page],
    queryFn: () =>
      fetcher<PaginatedResponse<Project>>({
        url: '/projects',
        params: { page, size },
      }),
  });
}
