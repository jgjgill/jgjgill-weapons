import { useEffect, useRef } from "react";

/**
 *
 * 컴포넌트가 unmount될 때 실행되는 cleanup 함수
 * @param {() => void} func - unmount 시
 * @reference [useUmount.ts](https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useUnmount/useUnmount.ts)
 * @example
 * ```tsx
 * useUnmount(() => {
 *   // Cleanup logic here
 * });
 * ```
 */

export function useUnmount(func: () => void) {
  const funcRef = useRef(func);

  useEffect(() => {
    return () => {
      funcRef.current();
    };
  });
}
