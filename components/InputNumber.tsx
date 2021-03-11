import React, {
  FC,
  FormEvent,
  HTMLProps,
  ReactNode,
  useCallback,
} from "react";

import {
  isArrowKey,
  isBackspaceKey,
  isDeleteKey,
  isNumberKey,
  isTabKey,
} from "../helpers/keyboard";

import {
  commaSeparator,
  formatNumber,
  getDecimalCount,
  reformatNumber,
} from "../helpers/number";

import { classNames, mergeClasses } from "../helpers/utils";

interface InputNumberProps extends HTMLProps<HTMLInputElement> {
  value: number | string;
  bordered: boolean;
  wrapperClassName?: string;
  onUpdate?: (value: number, event: FormEvent<HTMLInputElement>) => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const InputNumber: FC<InputNumberProps> = ({
  value,
  wrapperClassName,
  className,
  bordered,
  leftIcon,
  rightIcon,
  onUpdate,
  ...props
}) => {
  const decimalCount = 0;
  const separatorType = "period";
  const formattedNumber = formatNumber(value, separatorType);
  const comma = commaSeparator(separatorType);
  const hasComma = formattedNumber.includes(comma);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const number = reformatNumber(
        (e.target as HTMLInputElement).value,
        separatorType
      );
      const decimalLength = getDecimalCount(number);
      const allowDecimal = typeof decimalCount === "number" && decimalCount > 0;
      const decimalValid =
        decimalLength && decimalCount ? decimalLength < decimalCount : true;

      if (
        e.ctrlKey ||
        (isNumberKey(e) && decimalValid) ||
        (!hasComma && e.key === comma && allowDecimal) ||
        isBackspaceKey(e) ||
        isDeleteKey(e) ||
        isArrowKey(e) ||
        isTabKey(e)
      ) {
        return true;
      }

      e.preventDefault();
      return false;
    },
    [hasComma, separatorType, decimalCount]
  );

  return (
    <div className={mergeClasses(wrapperClassName, "relative")}>
      {leftIcon && (
        <div className={classNames(["absolute left-0 top-0 px-3 py-2"])}>
          {leftIcon}
        </div>
      )}
      <input
        value={formattedNumber}
        className={mergeClasses(className, [
          "bg-white w-full px-3 py-2 rounded",
          bordered ? "border-2 border-gray-300": "border-2 border-white",
          "focus:outline-none focus:border-2 focus:border-primary focus:shadow-lg",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
        ])}
        onKeyDown={onKeyDown}
        onChange={(e) =>
          onUpdate
            ? onUpdate(parseFloat(reformatNumber(e.target.value, separatorType)), e)
            : null
        }
        {...props}
      />
      {rightIcon && (
        <div className={classNames(["absolute right-0 top-0 px-3 py-2"])}>
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default InputNumber;
