import React from "react";
import { Store, SearchX } from "lucide-react";
import Button from "./Button";

export const EmptyState = ({
  title = "No shops found",
  message = "Try adjusting your search criteria or resetting filters to find local shops in Kattupakkam or Iyyappanthangal.",
  onReset,
  resetText = "Clear All Filters"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 my-8 text-center bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{message}</p>
      {onReset && (
        <Button variant="primary" onClick={onReset} icon={Store}>
          {resetText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
