import { memo } from "react";

type Props = {
  verticalGap?: number;
};

const Spacer = ({ verticalGap }: Props) => {
  return (
    <div
      style={{ height: `${verticalGap ? verticalGap + "px" : "20px"}` }}
      className="spacer"
    ></div>
  );
};

export default memo(Spacer);
