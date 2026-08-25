import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const PopoverContext = createContext();

export const Popover = ({ children, className = "" }) => {
  const [open, setOpen] = useState(false);
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className={`relative inline-block ${className}`}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({ children, className = "" }) => {
  const { setOpen, open } = useContext(PopoverContext);
  
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={className}
    >
      {children}
    </button>
  );
};

export const PopoverContent = ({ children, align = "center", className = "" }) => {
  const { open, setOpen } = useContext(PopoverContext);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  if (!open) return null;

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 z-50 w-auto rounded-md border bg-white p-4 text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${alignmentClasses[align]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Popover;
