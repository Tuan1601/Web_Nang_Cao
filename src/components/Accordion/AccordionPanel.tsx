import type { ReactNode } from 'react';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

interface AccordionPanelProps {
  children: ReactNode;
}

export function AccordionPanel({ children }: AccordionPanelProps) {
  const { activeValue } = useAccordionContext();
  const { value } = useAccordionItemContext();
  const isOpen = activeValue === value;

  return (
    <div
      className={`accordion-panel ${isOpen ? 'accordion-panel--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="accordion-panel-content">
        {children}
      </div>
    </div>
  );
}
