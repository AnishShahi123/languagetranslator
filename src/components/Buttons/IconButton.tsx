import React from "react";

interface IconButtonProps {
  Icon: any;
  onClick: () => void;
}

const IconButton = (props: IconButtonProps) => {
  const { Icon, onClick } = props;
  return (
    <span
      className="cursor-pointer flex items-center space-x-2 text-neutral-400"
      onClick={onClick}
    >
      <Icon size={22} />
    </span>
  );
};

export { IconButton };
