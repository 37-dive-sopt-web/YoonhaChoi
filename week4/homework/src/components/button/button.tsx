interface ButtonProps {
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ children, disabled, onClick, ...props }: ButtonProps) => {
  const baseStyle =
    "h-10 w-full rounded-xl text-white font-bold transition-colors duration-200";

  const falseStyle = "bg-teal-200/50 cursor-not-allowed";
  const imageActiveClasses = "bg-teal-400 hover:bg-teal-500";

  const stateClasses = disabled ? falseStyle : imageActiveClasses;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${stateClasses}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
