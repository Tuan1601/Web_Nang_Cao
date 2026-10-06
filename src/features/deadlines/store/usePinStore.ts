import { create } from 'zustand';

export interface PinState {
  pinnedIds: string[];
  togglePin: (id: string) => void;
  isPinned: (id: string) => boolean;
  clearPins: () => void;
  hydrate: () => void;
}

const PIN_STORAGE_KEY = 'sdt_pinned_assignments_v1';

function getInitialPinnedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(PIN_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === 'string');
    }
  } catch {
    // Ignore JSON/storage errors
  }
  return [];
}

function persistPinnedIds(pinnedIds: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PIN_STORAGE_KEY, JSON.stringify(pinnedIds));
  } catch {
    // Ignore storage quota errors
  }
}

export const usePinStore = create<PinState>((set, get) => ({
  // Initialize as empty array on SSR and initial client render to avoid hydration mismatch
  pinnedIds: [],

  togglePin: (id: string) => {
    set((state) => {
      const exists = state.pinnedIds.includes(id);
      const next = exists
        ? state.pinnedIds.filter((item) => item !== id)
        : [id, ...state.pinnedIds];
      persistPinnedIds(next);
      return { pinnedIds: next };
    });
  },

  isPinned: (id: string) => {
    return get().pinnedIds.includes(id);
  },

  clearPins: () => {
    persistPinnedIds([]);
    set({ pinnedIds: [] });
  },

  hydrate: () => {
    const ids = getInitialPinnedIds();
    if (ids.length > 0) {
      set({ pinnedIds: ids });
    }
  },
}));

// Auto-hydrate on client after initial render cycle
if (typeof window !== 'undefined') {
  // Use setTimeout to ensure initial render/hydration pass finishes cleanly
  setTimeout(() => {
    usePinStore.getState().hydrate();
  }, 0);
}
