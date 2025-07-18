import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: () => void, shallow?: boolean) => {
  const domNode = useRef<HTMLElement>(null);

  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (
        !domNode.current!.contains(event.target as HTMLElement) &&
        (shallow ? !domNode.current!.parentElement?.contains(event.target as HTMLElement) : true)
      ) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};
