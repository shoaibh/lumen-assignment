import React from "react";

export const Input = ({
  setInputVal,
  value,
  type,
}: {
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  type: string;
}) => {
  return (
    <input
      type={type}
      className="w-full border border-gray-800 p-3"
      value={value}
      onChange={(e) => setInputVal(e.target.value)}
    />
  );
};
