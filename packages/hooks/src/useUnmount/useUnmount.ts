import { useEffect, useRef } from "react";

export function useUnmount(func: () => void) {
  const funcRef = useRef(func);

  useEffect(() => {
    return () => {
      funcRef.current();
    };
  });

  console.log(12345);
}
