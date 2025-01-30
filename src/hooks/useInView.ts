import { useState, useEffect, useRef } from "react";

const useInView = ({ threshold = .5, root = null, rootMargin = "0px" } = {}) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold, root, rootMargin }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return { isInView, elementRef };
};

export default useInView;