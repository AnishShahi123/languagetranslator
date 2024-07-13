import React, { ChangeEvent } from "react";
import { IconPaperclip } from "@tabler/icons-react";
import { IconButton } from "../Buttons/IconButton";

interface FileUploadProps {
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload = (props: FileUploadProps) => (
  <label htmlFor="file-upload" className="cursor-pointer">
    <IconButton Icon={IconPaperclip} onClick={() => {}} />
    <input
      type="file"
      id="file-upload"
      onChange={props?.handleFileUpload}
      className="hidden"
    />
  </label>
);

export default FileUpload;
