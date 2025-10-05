// src/components/ui/MyDrawer.jsx
import React from "react";
import { Drawer } from "vaul";

export default function MyDrawer() {
  return (
    <Drawer.Root>
      {/* Trigger button */}
      <Drawer.Trigger className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Open Drawer
      </Drawer.Trigger>

      <Drawer.Portal>
        {/* Overlay */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />

        {/* Drawer content with slide-up animation */}
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-lg shadow-xl animate-slide-up">
          <h2 className="text-xl font-bold mb-4">Drawer Title</h2>
          <p className="mb-4">
            This is some content inside the drawer.
          </p>

          {/* Close button */}
          <Drawer.Close className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Close
          </Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}