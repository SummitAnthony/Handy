import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-soft"
    | "secondary"
    | "danger"
    | "danger-ghost"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer";

  const variantClasses = {
    primary:
      "text-white bg-accent border-transparent shadow-sm hover:bg-accent/85",
    "primary-soft":
      "text-accent bg-accent/12 border-transparent hover:bg-accent/20",
    secondary:
      "bg-fill border-hairline shadow-xs hover:border-hairline-strong hover:bg-fill-hover",
    danger:
      "text-white bg-red-500 border-transparent shadow-sm hover:bg-red-600",
    "danger-ghost":
      "text-red-500 dark:text-red-400 border-transparent hover:bg-red-500/10 focus:bg-red-500/15",
    ghost: "text-current border-transparent hover:bg-fill-hover",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-[5px] text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
