type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControls({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex gap-4 justify-between">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
