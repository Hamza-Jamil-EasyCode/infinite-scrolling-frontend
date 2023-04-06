import React, { memo, useEffect, useMemo } from "react";

type Props = {
  closeSideBar: () => void;
};

const CrossButton = ({ closeSideBar }: Props) => {
  const toggleSideBar = () => {
    const element: HTMLElement = document.getElementById("crossBtn")!;
    element.classList.toggle("change");
    closeSideBar();
  };

  return (
    <div className="cross-btn">
      <i className="fa-solid fa-align-right" onClick={closeSideBar}></i>
    </div>
  );
};

export default memo(CrossButton);
