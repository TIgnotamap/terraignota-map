export default function Title({ title, subtitle, handleClose }) {
  if (!title) return null;

  return (
    <div className="flex flex-col items-center bg-[radial-gradient(#fff_10%,_#ffffff00_70%)] font-serif drop-shadow-[0_0_2px_#fff] dark:bg-[radial-gradient(#000_0%,_#00000000_70%)] dark:drop-shadow-[0_0_2px_#000]">
      <div
        className="text-[2.75rem] leading-tight drop-shadow-[0_0_2px_#fff] dark:drop-shadow-[0_0_2px_#000]"
        // style={{
        //   background: `radial-gradient(#fff 0%, #ffffff00 80%)`,
        // }}
      >
        {title}
      </div>

      <div className="drop-shadow-[0_0_2px_#fff] dark:drop-shadow-[0_0_2px_#000]">
        {subtitle ?? "."}
      </div>

      <div
        onClick={handleClose}
        className="pointer-events-auto mt-4 cursor-pointer select-none border border-gray bg-light font-mono drop-shadow-md dark:invert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="undefined"
          className="drop-shadow-[0_0_2px_#fff]"
        >
          <path d="M256-227.69 227.69-256l224-224-224-224L256-732.31l224 224 224-224L732.31-704l-224 224 224 224L704-227.69l-224-224-224 224Z" />
        </svg>
      </div>
    </div>
  );
}
