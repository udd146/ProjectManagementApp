import { useEffect } from "react";

const Notification = ({ message, success, show, onClose }) => {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg bg-white font-medium transition-all duration-300
        ${success ? "text-green-400" : "text-red-500"}`}
    >
      {message}
    </div>
  );
};

export default Notification;