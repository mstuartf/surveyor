import React, { useEffect, useRef, useState } from "react";

interface Props {
  initialValue: string;
  callback: (v: string) => void;
  timeout?: number;
}

export const DebouncedInput = ({
  initialValue,
  callback,
  timeout = 500
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

  return (
    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
  );
};
