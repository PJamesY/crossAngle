import React from "react";
import "./PageMoveBtn.css";

export interface PageMoveBtnProps {
  children: JSX.Element | JSX.Element[];
}

function PageMoveBtn({ children }: PageMoveBtnProps) {
  return <div className="page-move-btn">{children}</div>;
}

export default PageMoveBtn;
