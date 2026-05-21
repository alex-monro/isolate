// Sidebar.tsx
"use client";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState("Stem Splitter");
  const navItems = [
    "Stem Splitter",
    "How it works",
    "History",
    "Buy me a coffee",
  ];

  return (
    <aside className="shrink-0 w-64 h-screen  border-r border-gray-200 ">
      <nav className=" h-full p-8 py-12 font-medium text-lg">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li className="mb-2" key={item}>
              <a
                href="#"
                className={`block py-2 px-4 rounded-lg transition-colors duration-200   ${isActive === item ? "bg-black text-white" : "hover:bg-gray-200"}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsActive(item);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
