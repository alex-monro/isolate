"use client";

import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isActive, setIsActive] = useState("Stem Splitter");

  const navItems = [
    "Stem Splitter",
    "How it works",
    "History",
    "Buy me a coffee",
  ];

  return (
    <aside
      className={`shrink-0 border-r border-gray-200 transition-all duration-300 ${collapsed ? "w-12" : "w-64"}`}
    >
      <div className="relative h-full flex flex-col">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-10 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
        </button>

        <nav
          className={`h-full p-8 py-12 font-medium text-lg transition-opacity duration-200 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100 delay-200"}`}
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li className="mb-2" key={item}>
                <a
                  href="#"
                  className={`block py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap ${isActive === item ? "bg-black text-white" : "hover:bg-gray-200"}`}
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
      </div>
    </aside>
  );
};

export default Sidebar;
