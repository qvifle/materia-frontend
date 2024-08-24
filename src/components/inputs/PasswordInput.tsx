import { Input, InputProps } from "@nextui-org/react";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = (props: InputProps) => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((s) => !s);
  };

  return (
    <Input
      endContent={
        <button
          className="flex items-center justify-center w-4 h-4 my-auto"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      }
      type={isVisible ? "text" : "password"}
      {...props}
    />
  );
};

export default PasswordInput;
