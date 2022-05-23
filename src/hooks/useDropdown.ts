import { useState, useCallback, useRef, useEffect } from "react";

const ESC_KEY = 27;

const onEscapeKeyPress =
  (fn: any) =>
  ({ keyCode }: { keyCode: any }) =>
    keyCode === ESC_KEY ? fn() : null;

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleGlobalMouseDown = ({ target }: { target: any }) => {
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      close();
    };

    const handleGlobalKeydown = onEscapeKeyPress(close);

    document.addEventListener("mousedown", handleGlobalMouseDown);
    document.addEventListener("keydown", handleGlobalKeydown);

    return () => {
      document.removeEventListener("mousedown", handleGlobalMouseDown);
      document.removeEventListener("keydown", handleGlobalKeydown);
    };
  }, [close]);

  return [ref, isOpen, open, close];
};

export default useDropdown;
