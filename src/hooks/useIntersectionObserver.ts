import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0,
    triggerOnce = false
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef<Element | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsIntersecting(isIntersecting);
        
        if (isIntersecting && triggerOnce) {
          setHasTriggered(true);
          observer.unobserve(target);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce, hasTriggered]);

  return { targetRef, isIntersecting };
};