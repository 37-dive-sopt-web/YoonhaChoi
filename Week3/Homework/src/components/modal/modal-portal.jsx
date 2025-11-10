import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const portalRoot = document.getElementById("modal-root");

const ModalPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return createPortal(children, portalRoot || document.body);
  }

  return null;
};

export default ModalPortal;
