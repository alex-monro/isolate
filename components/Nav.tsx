import Link from "next/link";
import { Disc3 } from "lucide-react";

const Nav = () => {
  return (
    <nav>
      <div className="mx-auto px-8 py-6 flex justify-between border-b border-gray-200">
        <Link href="/" className="flex items-center gap-3">
          <Disc3 className="w-10 h-10 text-black" strokeWidth={2.5} />
          <span className="text-3xl font-extrabold tracking-[-0.96px]">
            Stem.Split
          </span>
        </Link>
        <div className="space-x-4"></div>
      </div>
    </nav>
  );
};

export default Nav;
