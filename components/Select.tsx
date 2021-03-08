import React, { FC, HTMLProps, ReactElement, useState } from "react";
import { classNames, mergeClasses } from "../helpers/utils";

interface SelectProps extends HTMLProps<HTMLSelectElement> {
  wrapperClassName?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const Select: FC<SelectProps> = ({
  wrapperClassName,
  className,
  leftIcon,
  rightIcon,
  children,
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
      <select
        className={mergeClasses(className, [
          "bg-white w-full px-3 py-2 rounded",
          "appearance-none",
          "focus:outline-none focus:border-2 focus:border-primary focus:shadow-lg",
          "focus:ring-2 focus:ring-primary",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
        ])}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      >
        {children}
      </select>
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

export default Select;
