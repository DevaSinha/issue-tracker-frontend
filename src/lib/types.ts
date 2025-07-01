export type Project = {
  id: string;
  name: string;
  description: string;
  createdBy: string;
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  assignee: string;
  createdBy: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
};
