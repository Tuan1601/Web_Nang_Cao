'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const maxWidthMap = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

export function Modal({ isOpen, onClose, title, children, maxWidth = 'md' }: ModalProps) {
  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 animate-fade-in" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }} onClick={onClose} />

      <div
        className={`relative w-full ${maxWidthMap[maxWidth]} rounded-t-3xl sm:rounded-2xl overflow-hidden animate-scale-in`}
        style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-modal)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex justify-center pt-3 pb-0 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border-default)' }} />
        </div>

        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
          <button type="button" onClick={onClose} aria-label="Đóng" className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
