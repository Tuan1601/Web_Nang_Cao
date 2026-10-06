'use client';

import React, { useEffect, useState } from 'react';
import { useTheme, type Theme } from '@/shared/context/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9" />;

  const options: { value: Theme; Icon: typeof Sun; label: string }[] = [
    { value: 'light',  Icon: Sun,     label: 'Sáng' },
    { value: 'system', Icon: Monitor, label: 'Hệ thống' },
    { value: 'dark',   Icon: Moon,    label: 'Tối' },
  ];

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.06)' }}
      role="group"
      aria-label="Chuyển đổi giao diện sáng tối"
    >
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
