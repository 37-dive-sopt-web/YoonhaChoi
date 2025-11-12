const Tab = ({ children, isActive = false, variant = "state", onClick }) => {
  let base = "cursor-pointer whitespace-nowrap px-4 h-8 rounded-full text-sm";

  let state = "";

  if (variant === "state") {
    if (isActive) {
      state = "bg-green-600 text-white hover:bg-green-600";
    } else {
      state = "bg-green-50 hover:bg-green-200";
    }
  } else if (variant === "reset") {
    state = "bg-red-500 text-white hover:bg-red-400";
  }

  const combinestyle = `${base} ${state}`;

  return (
    <button type="button" className={combinestyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Tab;
