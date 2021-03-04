import React, { FC } from "react";

const Container: FC = ({children}) => {
  return (
    <div className="container h-full w-full px-4 md:px-0 md:w-5/12 lg:w-4/12 mx-auto">
      {children}
    </div>
  );
};

export default Container;
