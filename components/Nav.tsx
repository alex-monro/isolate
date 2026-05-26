"use client";

const Nav = () => {
  return (
    <nav>
      <div className="mx-auto px-8 py-4 flex justify-between border-b border-neutral-100">
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex items-center"
        >
          <img src="/logo.svg" alt="isolate.fm" className="h-5 w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
