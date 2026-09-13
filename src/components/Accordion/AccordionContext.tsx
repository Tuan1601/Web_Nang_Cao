import { createContext, useContext } from 'react';

export interface AccordionContextType {
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
}

export const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export function useAccordionContext(): AccordionContextType {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext phải được dùng bên trong <Accordion>');
  }
  return context;
}

export interface AccordionItemContextType {
  value: string;
}

export const AccordionItemContext = createContext<AccordionItemContextType | undefined>(undefined);

export function useAccordionItemContext(): AccordionItemContextType {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error('useAccordionItemContext phải được dùng bên trong <Accordion.Item>');
  }
  return context;
}
