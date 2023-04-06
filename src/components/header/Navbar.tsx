import React, { memo } from "react";
import CrossButton from "./CrossButton";
import UserAvatar from "./UserAvatar";

type Props = {
  triggerSideBar?: () => void;
};

const Navbar = ({ triggerSideBar }: Props) => {
  return (
    <div className="navbar_wrapper">
      <CrossButton closeSideBar={() => triggerSideBar?.()} />
      <div className="right_part">
        {/* <CreateLessonBtn redirectPath="/lesson" label="Create new lesson" /> */}
        <UserAvatar />
      </div>
    </div>
  );
};

export default memo(Navbar);

