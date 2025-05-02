import React from 'react';
import { AlertCircle, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from 'react';

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center shadow-sm">
    <AlertCircle className="mr-2 flex-shrink-0" size={20} />
    <span className="text-sm">{message}</span>
  </div>
);

export const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    className={cn(
      "px-4 py-2 mr-2 rounded-md font-medium transition-all",
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export const DeleteButton: React.FC<{
  onClick: () => void;
  small?: boolean;
}> = ({ onClick, small = false }) => (
  <button
    className={cn(
      "bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md transition-colors inline-flex items-center",
      small ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
    )}
    onClick={onClick}
    aria-label="Delete"
  >
    <Trash2 className={cn("mr-1", small ? "h-3 w-3" : "h-4 w-4")} />
    Delete
  </button>
);

export const AddButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors inline-flex items-center shadow-sm"
    onClick={onClick}
  >
    <Plus className="mr-1 h-4 w-4" />
    {children}
  </button>
);

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("bg-card text-card-foreground border rounded-lg shadow-sm", className)}>
    {children}
  </div>
);

export const FormField: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="mb-2">
    <label className="block text-sm font-medium mb-1 text-foreground/80">{label}</label>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-background"
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-background appearance-none"
  />
);

// Collapsible Section Component
export const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  rightElement?: React.ReactNode;
}> = ({ title, children, defaultOpen = false, rightElement }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center py-2 px-1 cursor-pointer border-b"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? <ChevronDown className="h-5 w-5 mr-1.5" /> : <ChevronRight className="h-5 w-5 mr-1.5" />}
          <h4 className="font-medium">{title}</h4>
        </div>
        {rightElement}
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};