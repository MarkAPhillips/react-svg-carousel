import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({ width = 600, height = 400 }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const carouselRef = useRef(null);

  const rectWidth = 60;
  const rectSpacing = 4;
  const visibleRects = 6;
  const totalRects = 20;

  const slide = (direction) => {
    setCurrentPosition((prev) => {
      const next = Math.max(0, Math.min(prev + direction, totalRects - visibleRects));
      return next;
    });
  };

  useEffect(() => {
    const translateX = -currentPosition * (rectWidth + rectSpacing);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-out';
      carouselRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [currentPosition]);

  const rectangles = Array.from({ length: totalRects }, (_, i) => (
    <rect
      key={i}
      x={i * (rectWidth + rectSpacing) + 30}
      y={10}
      width={rectWidth}
      height={height - 20}
      fill={`hsl(${i * 18}, 70%, 60%)`}
    />
  ));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="0" width={width} height={height} fill="#f0f0f0" />
      <g ref={carouselRef}>
        {rectangles}
      </g>
      <g>
        <rect
          x="0"
          y="0"
          width="30"
          height={height}
          fill="rgba(0,0,0,0.3)"
          cursor="pointer"
          onClick={() => slide(-1)}
        />
        <rect
          x={width - 30}
          y="0"
          width="30"
          height={height}
          fill="rgba(0,0,0,0.3)"
          cursor="pointer"
          onClick={() => slide(1)}
        />
        <text x="15" y={height / 2} fill="white" pointerEvents="none">
          ←
        </text>
        <text x={width - 15} y={height / 2} fill="white" pointerEvents="none">
          →
        </text>
      </g>
    </svg>
  );
};

export default Carousel;
