interface InputProps {
  label: string;
  placeholder: string;
}

const Input = ({ label, placeholder }: InputProps) => {
  return (
    <div className="flex w-full flex-col gap-2 pb-6">
      <label className="text-gray-500">{label}</label>

      <input
        type="text"
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-gray-300 px-4 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-teal-400 focus:outline-none"
      />
    </div>
  );
};

export default Input;
