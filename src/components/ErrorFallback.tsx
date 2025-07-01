type Props = {
  message?: string;
  retry?: () => void;
};

export default function ErrorFallback({ message = 'Something went wrong', retry }: Props) {
  return (
    <div className="text-center py-10">
      <p className="text-red-500 font-medium">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="mt-4 px-4 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
        >
          Retry
        </button>
      )}
    </div>
  );
}
