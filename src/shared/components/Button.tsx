'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties & Record<string, string>> = {
  primary:   {},
  secondary: {},
  danger:    {},
  ghost:     {},
  success:   {},
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 focus-visible:outline-indigo-600',
  secondary:
    'bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)] focus-visible:outline-[var(--border-default)]',
  danger:
    'bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/20 focus-visible:outline-red-500',
  ghost:
    'bg-transparent hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] focus-visible:outline-[var(--border-default)]',
  success:
    'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 focus-visible:outline-emerald-500',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm font-medium rounded-xl gap-2',
  lg: 'px-5 py-3 text-base font-semibold rounded-xl gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center
        transition-all duration-200
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      )}
      {children}
    </button>
  );
}
