import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement>(): [MutableRefObject<T | null>, boolean] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const ref = useRef<T | null>(null);

  const handleMouseOver = useCallback(() => setIsHovered(true), []);
  const handleMouseOut = useCallback(() => setIsHovered(false), []);

  useEffect(
    () => {
      const element = ref.current;

      element?.addEventListener('mouseover', handleMouseOver);
      element?.addEventListener('mouseout', handleMouseOut);

      return () => {
        element?.removeEventListener('mouseover', handleMouseOver);
        element?.removeEventListener('mouseout', handleMouseOut);
      };
    },
    [ref, handleMouseOver, handleMouseOut], // Recall only if ref changes
  );

  return [ref, isHovered];
};
