import React, { useState } from "react";
import { useVaul } from "vaul";

const MyDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const vaul = useVaul();

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        {isOpen ? "Close" : "Open"} Drawer
      </button>

      {isOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4">
          <button
            onClick={toggleDrawer}
            className="mb-4 px-3 py-1 bg-secondary text-white rounded"
          >
            Close
          </button>

          <div>
            <h2 className="text-lg font-bold mb-2">Vaul Session</h2>
            <button
              onClick={() => vaul?.open()}
              className="px-3 py-1 bg-accent text-white rounded"
            >
              Open Vaul Modal
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      )}
    </>
  );
};

export default MyDrawer;