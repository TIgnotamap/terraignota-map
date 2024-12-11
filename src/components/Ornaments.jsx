export default function Ornaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 flex h-screen w-full flex-col items-center justify-between"
    >
      <div className="h-8 w-[1px] bg-dark dark:bg-light" />
      <div className="flex w-full items-center justify-between">
        <div className="h-[1px] w-8 bg-dark dark:bg-light" />
        <div className="rotate-45 text-2xl">⊹</div>
        <div className="h-[1px] w-8 bg-dark dark:bg-light" />
      </div>
      <div className="h-8 w-[1px] bg-dark dark:bg-light" />
    </div>
  );
}
