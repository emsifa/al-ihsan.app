import React, { FC, HTMLProps, ReactElement, useState } from "react";
import { classNames, mergeClasses } from "../helpers/utils";

interface InputProps extends HTMLProps<HTMLInputElement> {
  wrapperClassName?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const Input: FC<InputProps> = ({
  wrapperClassName,
  className,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className={mergeClasses(wrapperClassName, "relative")}>
      {leftIcon && (
        <div
          className={classNames([
            "absolute left-0 top-0 px-3 py-2",
          ])}
        >
          {leftIcon}
        </div>
      )}
      <input
        type="text"
        className={mergeClasses(className, [
          "w-full px-3 py-2 rounded",
          "focus:outline-none focus:border-2 focus:border-primary focus:shadow-lg",
          "focus:ring-2 focus:ring-primary",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
        ])}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      {rightIcon && (
        <div
          className={classNames([
            "absolute right-0 top-0 px-3 py-2",
            focus ? "text-secondary" : "text-gray-300",
          ])}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default Input;
