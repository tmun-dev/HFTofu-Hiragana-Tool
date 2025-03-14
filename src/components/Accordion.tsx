// components/Accordion.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Using lucide icons since you already have it

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-bebas text-[#268bd2]">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#268bd2]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#268bd2]" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 ml-8 text-[#3c3f41] bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
  items: {
    title: string;
    content: React.ReactNode;
  }[];
}

const Accordion = ({ items }: AccordionProps) => {
  return (
    <div className="border-t border-gray-200 rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;