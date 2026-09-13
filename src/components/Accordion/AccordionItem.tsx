import type { ReactNode } from 'react';
import { AccordionItemContext } from './AccordionContext';

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className="accordion-item">
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
