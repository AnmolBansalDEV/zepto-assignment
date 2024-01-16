"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>((props , ref) => {
  Input.displayName = 'Input'
  return (
    <input
      className="focus:outline-0"
      placeholder="Add new user..."
      ref={ref}
      {...props}
    />
  );
});

export default Input;
