interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
  }
  
  export default function Button({
    onClick,
    children,
    className = "",
    type = "button",
    disabled = false,
  }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`bg-blue-600 text-gray-600 dark:text-amber-200 py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 ${className}`}
      >
        {children}
      </button>
    );
  }
  