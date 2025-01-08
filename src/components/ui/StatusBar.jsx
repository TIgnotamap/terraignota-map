import { useContext, useEffect } from "react";
import { StatusBarContext } from "../../utils/StatusBarContext";

export default function StatusBar({ data }) {
  const { status, setStatus, defaultStatus, setDefaultStatus } =
    useContext(StatusBarContext);

  useEffect(() => {
    setDefaultStatus(data?.items?.length + " items");
  }, [data]);

  return (
    <div className="fixed left-6 top-4 font-serif text-sm">
      {status || defaultStatus}
    </div>
  );
}
