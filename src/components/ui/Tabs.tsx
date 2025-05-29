import React, { useState, createContext } from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ 
  defaultValue, 
  value, 
  onValueChange, 
  children 
}) => {
  const [tabValue, setTabValue] = useState(defaultValue || '');
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : tabValue;
  
  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setTabValue(newValue);
    }
    onValueChange?.(newValue);
  };
  
  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ onValueChange, children }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onSelect: () => onValueChange(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabsTriggerProps {
  isActive?: boolean;
  onSelect?: () => void;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  isActive, 
  onSelect, 
  children 
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        isActive 
          ? 'bg-secondary-100 text-secondary-800' 
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
      }`}
      onClick={onSelect}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  active?: boolean;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ 
  active, 
  children 
}) => {
  if (!active) return null;
  
  return (
    <div className="tab-content">
      {children}
    </div>
  );
};