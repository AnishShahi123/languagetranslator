import React, { ChangeEvent } from "react";
import { IconLink } from "@tabler/icons-react";
import { IconButton } from "../Buttons/IconButton";

interface LinkPasteProps {
  handleLinkPaste: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LinkPaste = (props: LinkPasteProps) => {
  return (
    <>
      <label htmlFor="link-input" className="cursor-pointer">
        <IconButton Icon={IconLink} onClick={() => {}} />
        <input
          type="text"
          id="link-input"
          className="hidden"
          onChange={props?.handleLinkPaste}
        />
      </label>
    </>
  );
};

export default LinkPaste;
