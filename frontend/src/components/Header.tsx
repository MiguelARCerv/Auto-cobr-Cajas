export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm px-4 pt-4 pb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Entregar en</span>
          <div className="flex items-center gap-1 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M12.003 11.73q.668 0 1.14-.475q.472-.475.472-1.143t-.475-1.14q-.476-.472-1.143-.472t-1.14.476q-.472.475-.472 1.143t.475 1.14q.476.472 1.143.472Z"
              />
            </svg>
            <span>Av. Siempre Viva 742</span>
          </div>
        </div>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
          <span className="material-symbols-outlined">
            <svg width="30" height="30" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="#000" fill="none" />
            </svg>
          </span>
        </button>
      </div>
    </header>
  );
}
