import { useState, useRef, useCallback, useEffect } from "react";

const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const currentElementRef = useRef<Element | null>(null);

  const stopObservingCurrentElement = useCallback(() => {
    currentElementRef.current &&
      observerRef.current?.unobserve(currentElementRef.current);
    setIsIntersecting(false);
  }, []);

  const stopObserving = useCallback(() => {
    observerRef.current?.disconnect();
    setIsIntersecting(false);
  }, []);

  const startObserving = useCallback((newElement: Element) => {
    stopObservingCurrentElement();
    observerRef.current?.observe(newElement);
  }, []);

  const restartIntersecting = useCallback(() => {
    setIsIntersecting(false);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentElementRef.current = entry.target;
          setIsIntersecting(true);
        }
      });
    });
    currentElementRef.current &&
      observerRef.current.observe(currentElementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    isIntersecting,
    stopObservingCurrentElement,
    stopObserving,
    startObserving,
    restartIntersecting,
  };
};

export default useIntersectionObserver;
