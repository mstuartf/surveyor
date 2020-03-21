import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface Props {
  initialValue: string;
  callback: (v: string) => void;
  timeout?: number;
  children: any;
}

export const DebouncedInput = ({
  initialValue,
  callback,
  timeout = 500,
  children
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (value !== initialValue) {
        callback(value);
      }
    }, timeout);
  }, [value]);

  const extraProps = {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  };

  return React.cloneElement(children, extraProps);
};
