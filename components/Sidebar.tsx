"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = {
    "Stem Splitter": "/",
    "How it works": "/how-it-works",
    // "History": "/history",
    // "Buy me a coffee": "/buy-me-a-coffee",
  };

  return (
    <aside
      className={`shrink-0 border-r border-neutral-200 transition-all duration-300 ${collapsed ? "w-12" : "w-56"}`}
    >
      <div className="relative h-full flex flex-col">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-10 z-10 w-8 h-8 bg-white border border-neutral-200 rounded-full flex items-center justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight className="w-5 h-5" />
          ) : (
            <ChevronsLeft className="w-5 h-5" />
          )}
        </button>

        <nav
          className={`h-full p-6 py-10 font-medium text-base transition-opacity duration-200 ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100 delay-200"}`}
        >
          <ul className="flex flex-col gap-2">
            {Object.entries(navItems).map(([label, href]) => (
              <li className="mb-2" key={label}>
                <Link
                  href={href}
                  className={`block py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap ${pathname === href ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100 hover:text-black"}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
