'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9" />;

  const options = [
    { value: 'light',  Icon: Sun,     label: 'Sáng' },
    { value: 'system', Icon: Monitor, label: 'Hệ thống' },
    { value: 'dark',   Icon: Moon,    label: 'Tối' },
  ] as const;

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
      {options.map(({ value, Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            title={label}
            aria-label={`Giao diện ${label}`}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className="flex-1 flex items-center justify-center p-2 rounded-lg transition-all duration-200"
            style={
              active
                ? { background: 'rgba(255,255,255,0.15)', color: '#fff' }
                : { color: 'rgba(255,255,255,0.35)' }
            }
          >
            <Icon size={13} />
          </button>
        );
      })}
    </div>
  );
}
