import React, { useEffect, useRef, useState } from "react";

export const DebouncedInput = ({ init, saveFn, timeout = 500 }) => {
  const [value, setValue] = useState(init);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current as any);
    }

    (timeoutRef.current as any) = setTimeout(() => {
      timeoutRef.current = null;
      if (value !== init) {
        saveFn(value);
      }
    }, timeout);
  }, [value]);

  return (
    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
  );
};
