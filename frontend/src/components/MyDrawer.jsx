import React from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const MyDrawer = ({ open, setOpen, children }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-auto">
        <button
          className="absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>
        {children}
      </Dialog.Content>
    </Dialog>
  );
};

export default MyDrawer;