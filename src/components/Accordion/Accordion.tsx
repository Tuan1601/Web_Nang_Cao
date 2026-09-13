import type { ReactNode } from 'react';
import { useState } from 'react';
import { AccordionContext } from './AccordionContext';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionPanel } from './AccordionPanel';

interface AccordionProps {
  children: ReactNode;
  defaultValue?: string;
}

function AccordionRoot({ children, defaultValue }: AccordionProps) {
  const [activeValue, setActiveValue] = useState<string | null>(defaultValue ?? null);

  return (
    <AccordionContext.Provider value={{ activeValue, setActiveValue }}>
      <div className="accordion">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

AccordionRoot.Item = AccordionItem;
AccordionRoot.Trigger = AccordionTrigger;
AccordionRoot.Panel = AccordionPanel;

export const Accordion = AccordionRoot;
