import { useContext, useEffect } from "react";
import { StatusBarContext } from "../../utils/StatusBarContext";

export default function StatusBar({ data, filteredItems }) {
  const { status, setStatus, defaultStatus, setDefaultStatus } =
    useContext(StatusBarContext);

  useEffect(() => {
    setDefaultStatus(
      filteredItems?.length + "/" + data?.items?.length + " items",
    );
  }, [data, filteredItems]);

  return (
    <div className="bo pointer-events-none fixed left-[5rem] top-4 max-w-[33vw] rounded-md border border-lightGray bg-light px-2 py-0.5 font-mono text-xs text-darkGray dark:border-darkGray dark:bg-dark dark:text-gray">
      {status || defaultStatus}
    </div>
  );
}
