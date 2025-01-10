export default function Ornaments({ currentItem }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 flex h-screen w-full flex-col items-center justify-between"
    >
      <div className="h-6 w-[1px] bg-dark dark:bg-light" />
      <div className="flex w-full items-center justify-between">
        <div className="h-[1px] w-6 bg-dark dark:bg-light" />
        <div
          className={`text-2xl transition-opacity dark:invert ${currentItem ? "opacity-0" : "opacity-100"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="undefined"
          >
            <path d="M480-420q-25.31 0-42.65-17.35Q420-454.69 420-480t17.35-42.65Q454.69-540 480-540t42.65 17.35Q540-505.31 540-480t-17.35 42.65Q505.31-420 480-420Zm-20-220v-160h40v160h-40Zm0 480v-160h40v160h-40Zm180-300v-40h160v40H640Zm-480 0v-40h160v40H160Z" />
          </svg>
        </div>
        <div className="h-[1px] w-6 bg-dark dark:bg-light" />
      </div>
      <div className="h-6 w-[1px] bg-dark dark:bg-light" />
    </div>
  );
}
