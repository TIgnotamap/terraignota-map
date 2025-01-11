import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-auto bg-light px-6 py-24 dark:bg-dark">
      {message}
    </div>
  );
};

export default ErrorPage;
