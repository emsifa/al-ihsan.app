import React, { FC } from "react";

const Code: FC = ({ children }) => {
  return (
    <code className="inline-block px-1 text-sm bg-gray-100 border rounded">{children}</code>
  );
};

export default Code;
