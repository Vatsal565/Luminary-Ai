'use client'
import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

const DotMatrixText = () => {
  const text = 'Luminary AI';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 130;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Create dot matrix points
    const createDotMatrix = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text first to sample from
      ctx.fillStyle = 'black';
      ctx.font = 'bold 100px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points: Point[] = [];
      const dotSpacing = 8; // Space between dots

      // Scan for filled pixels in a grid pattern
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        for (let x = 0; x < canvas.width; x += dotSpacing) {
          const index = (y * canvas.width + x) * 4;
          if (pixels[index] < 128) { // If pixel is dark (part of text)
            points.push({ x, y });
          }
        }
      }

      dotsRef.current = points;

      // Draw the dots
      ctx.fillStyle = 'gray-700';
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2); // Larger dots (radius 3)
        ctx.fill();
      });
    };

    createDotMatrix();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="relative px-0 py-0">
      <canvas
        ref={canvasRef}
        className=""
      />
    </div>
  );
};

export default DotMatrixText;