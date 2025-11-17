import * as styles from "./button.css";

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
      className={styles.button({ disabled })}
    >
      {children}
    </button>
  );
};

export default Button;
