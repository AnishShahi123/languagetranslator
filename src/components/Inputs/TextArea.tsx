import React from "react";

interface TextAreaProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      rows={5}
      id={props?.id}
      className="py-2.5 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg bg-neutral-900 border-transparent text-neutral-400"
      placeholder={props?.placeholder}
      value={props?.value}
      onChange={props?.onChange}
    />
  );
};

export { TextArea };
