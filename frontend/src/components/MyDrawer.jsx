import React from "react";
import { Drawer } from "vaul";

const MyDrawer = ({ isOpen, onClose, children }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <Drawer.Content className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white rounded"
        >
          Close
        </button>
        {children}
      </Drawer.Content>
    </Drawer>
  );
};

export default MyDrawer;