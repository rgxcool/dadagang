'use client';

import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface LoadingButtonProps {
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export function LoadingButton({
  isLoading = false,
  children,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
}: LoadingButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      className={className}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Processing...
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
