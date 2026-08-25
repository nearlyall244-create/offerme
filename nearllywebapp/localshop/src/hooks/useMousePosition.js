import { useState, useEffect } from "react";

export const useMousePosition = (containerRef) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const normalizedX = (x / rect.width) * 2 - 1;
        const normalizedY = -(y / rect.height) * 2 + 1;
        setMousePosition({ x, y, normalizedX, normalizedY });
      } else {
        const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x: event.clientX, y: event.clientY, normalizedX, normalizedY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  return mousePosition;
};

export default useMousePosition;
