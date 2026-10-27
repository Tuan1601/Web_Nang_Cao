export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8" role="status" aria-label="Đang tải">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-slate-200" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-52 animate-pulse rounded-2xl bg-slate-200" />)}
      </div>
    </div>
  );
}
