interface ButtonProps {
  children: string;
  disabled: boolean;
  onClick: () => void;
}

const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="w-full"
    >
      {children}
    </button>
  );
};

export default Button;
