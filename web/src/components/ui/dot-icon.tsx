import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';
import React from 'react';

const DotIcon = ({ className }: { className?: string }) => {
  return (
    <Circle
      className={cn('bg-primary size-2.5 stroke-0 rounded-full', className)}
    />
  );
};

export default DotIcon;
