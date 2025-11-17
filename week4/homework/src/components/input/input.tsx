import * as styles from "./input.css";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
}

const Input = ({ label, placeholder, ...props }: InputProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default Input;
