import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-md hover:shadow-lg': variant === 'primary',
          'bg-blue-50 text-[var(--color-accent)] hover:bg-blue-100': variant === 'secondary',
          'border-2 border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-gray-50': variant === 'outline',
          'text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-[var(--color-text-primary)]': variant === 'ghost',
          'bg-red-50 text-[var(--color-error)] hover:bg-red-100': variant === 'danger',
        },
        {
          'h-9 px-4 text-sm': size === 'sm',
          'h-12 px-6 text-base': size === 'md',
          'h-14 px-8 text-lg': size === 'lg',
        },
        fullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-[var(--color-surface)] rounded-[20px] shadow-sm border border-[var(--color-border)] p-6", className)} {...props}>
      {children}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && <label className="text-sm font-medium text-[var(--color-text-primary)]">{label}</label>}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text-primary)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--color-error)] focus-visible:ring-[var(--color-error)]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
      </div>
    )
  }
)
Input.displayName = "Input"
