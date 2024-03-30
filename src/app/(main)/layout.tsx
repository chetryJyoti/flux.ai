import InfoBar from "@/components/infobar";
import SidebarComp from "@/components/sidebar";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <SidebarComp />
      <div className="w-full">
        <InfoBar />
        {props.children}S
      </div>
    </div>
  );
};

export default Layout;
