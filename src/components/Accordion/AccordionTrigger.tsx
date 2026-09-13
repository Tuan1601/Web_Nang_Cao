import type { ReactNode } from 'react';
import { useAccordionContext, useAccordionItemContext } from './AccordionContext';

interface AccordionTriggerProps {
  children: ReactNode;
}

export function AccordionTrigger({ children }: AccordionTriggerProps) {
  const { activeValue, setActiveValue } = useAccordionContext();
  const { value } = useAccordionItemContext();
  const isOpen = activeValue === value;

  function handleClick() {
    setActiveValue(isOpen ? null : value);
  }

  return (
    <button
      className={`accordion-trigger ${isOpen ? 'accordion-trigger--open' : ''}`}
      onClick={handleClick}
      aria-expanded={isOpen}
    >
      <span>{children}</span>
      <span className={`accordion-arrow ${isOpen ? 'accordion-arrow--open' : ''}`}>
        ▼
      </span>
    </button>
  );
}
