import React from "react";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export const ResetButton: React.FC<ResetButtonProps> = React.memo(
  ({ onClick, disabled = false, className = "", ariaLabel, children }) => (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`p-1.5 rounded-md border border-transparent transition-all duration-150 ${
        disabled
          ? "opacity-50 cursor-not-allowed text-text/40"
          : "hover:bg-fill-hover active:bg-accent/15 active:translate-y-[1px] hover:cursor-pointer hover:text-text text-text/45"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children ?? <RotateCcw className="w-4 h-4" />}
    </button>
  ),
);
