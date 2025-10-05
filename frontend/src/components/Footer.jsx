import React from "react";

export default function Footer() {
  return (
    <footer className="w-full p-4 bg-gray-100 text-center">
      <p>&copy; {new Date().getFullYear()} Lakwalahal Foundation. All rights reserved.</p>
    </footer>
  );
}