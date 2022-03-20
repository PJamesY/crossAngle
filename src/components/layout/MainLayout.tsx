import React from "react";
import "./MainLayout.css";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: Props) {
  return <main className="main-layout-wrapper">{children}</main>;
}

export default MainLayout;
