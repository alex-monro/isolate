"use client";

const Nav = () => {
  return (
    <nav>
      <div className="mx-auto px-8 py-4 flex justify-between border-b border-neutral-100">
        <button className="flex items-center" onClick={() => { window.location.href = "/"; }}>
          <img
            src="/logo.svg"
            alt="isolate"
            className="h-5 w-auto object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
