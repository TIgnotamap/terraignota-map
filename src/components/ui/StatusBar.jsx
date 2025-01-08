import { useContext, useEffect } from "react";
import { StatusBarContext } from "../../utils/StatusBarContext";

export default function StatusBar({ data }) {
  const { status, setStatus, defaultStatus, setDefaultStatus } =
    useContext(StatusBarContext);

  useEffect(() => {
    setDefaultStatus(data?.items?.length + " items");
  }, [data]);

  return (
    <div className="bo pointer-events-none fixed left-[5rem] top-4 max-w-[33vw] border border-gray bg-light px-1 font-serif text-sm dark:bg-dark">
      {status || defaultStatus}
    </div>
  );
}
