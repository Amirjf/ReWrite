'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type AccordionContextValue = {
  openItems: Set<string>;
  toggleItem: (value: string) => void;
  type?: 'single' | 'multiple';
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

type AccordionProps = {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', defaultValue, className, children }, ref) => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
      if (!defaultValue) return new Set();
      if (Array.isArray(defaultValue)) return new Set(defaultValue);
      return new Set([defaultValue]);
    });

    const toggleItem = React.useCallback(
      (value: string) => {
        setOpenItems(prev => {
          const newSet = new Set(prev);
          if (newSet.has(value)) {
            newSet.delete(value);
          } else {
            if (type === 'single') {
              newSet.clear();
            }
            newSet.add(value);
          }
          return newSet;
        });
      },
      [type]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className={className}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

type AccordionItemContextValue = {
  value: string;
  isOpen: boolean;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem components must be used within an AccordionItem'
    );
  }
  return context;
}

type AccordionItemProps = {
  value?: string;
  className?: string;
  children: React.ReactNode;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value: providedValue, className, children }, ref) => {
    const { openItems } = useAccordionContext();
    // Generate a unique value if none provided
    const autoValue = React.useId();
    const value = providedValue ?? autoValue;
    const isOpen = openItems.has(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn('border-b', className)}
          data-state={isOpen ? 'open' : 'closed'}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = {
  className?: string;
  children: React.ReactNode;
};

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children }, ref) => {
  const { toggleItem } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();

  return (
    <div className='flex'>
      <button
        ref={ref}
        type='button'
        onClick={() => toggleItem(value)}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180',
          className
        )}
      >
        {children}
        <ChevronDown className='h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200' />
      </button>
    </div>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

type AccordionContentProps = {
  className?: string;
  children: React.ReactNode;
};

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children }, ref) => {
  const { isOpen } = useAccordionItemContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(undefined);

  // Measure content height for smooth animation
  React.useEffect(() => {
    if (contentRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });

      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return (
    <div
      ref={ref}
      data-state={isOpen ? 'open' : 'closed'}
      className='overflow-hidden transition-all duration-300 ease-in-out'
      style={{
        maxHeight: isOpen ? height : 0,
        opacity: isOpen ? 1 : 0,
      }}
      aria-hidden={!isOpen}
    >
      <div ref={contentRef} className={cn('pb-4 pt-0', className)}>
        {children}
      </div>
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
