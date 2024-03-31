import React from "react";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-dvh">
      {props.children}
    </div>
  );
};

export default Layout;
