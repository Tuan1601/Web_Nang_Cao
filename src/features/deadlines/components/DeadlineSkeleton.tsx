'use client';

export function DeadlineSkeleton() {
  return (
    <div className="dl-card" data-priority="low" data-completed="false">
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="h-2.5 skeleton w-16 rounded-full" />
          <div className="h-2.5 skeleton w-20 rounded-full" />
        </div>
        <div className="h-4 skeleton w-4/5 mb-1.5 rounded" />
        <div className="h-4 skeleton w-3/5 mb-4 rounded" />
        <div className="flex gap-2 mb-3">
          <div className="h-3 skeleton w-20 rounded-full" />
          <div className="h-5 skeleton w-20 rounded-full" />
        </div>
        <div className="border-t mb-3" style={{ borderColor: 'var(--border-subtle)' }} />
        <div className="flex gap-1.5">
          <div className="flex-1 h-8 skeleton rounded-xl" />
          <div className="w-8 h-8 skeleton rounded-xl" />
          <div className="w-8 h-8 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DeadlineSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => <DeadlineSkeleton key={i} />)}
    </div>
  );
}
