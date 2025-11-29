import { useEffect, useRef } from 'react';

interface HeatmapOverlayProps {
  imageUrl: string;
  heatmapData: number[][];
  visible: boolean;
}

export default function HeatmapOverlay({ imageUrl, heatmapData, visible }: HeatmapOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!visible || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!ctx) return;

    const drawHeatmap = () => {
      if (!img.naturalWidth || !img.naturalHeight) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const cellWidth = canvas.width / heatmapData[0].length;
      const cellHeight = canvas.height / heatmapData.length;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < heatmapData.length; y++) {
        for (let x = 0; x < heatmapData[y].length; x++) {
          const intensity = heatmapData[y][x];

          if (intensity > 0.3) {
            const alpha = Math.min(intensity * 0.6, 0.7);

            const hue = 0;
            const saturation = 100;
            const lightness = 50 + (1 - intensity) * 20;

            ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
            ctx.fillRect(
              x * cellWidth,
              y * cellHeight,
              cellWidth,
              cellHeight
            );
          }
        }
      }
    };

    if (img.complete) {
      drawHeatmap();
    } else {
      img.onload = drawHeatmap;
    }
  }, [visible, heatmapData, imageUrl]);

  return (
    <div className="relative w-full">
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Analysis"
        className="w-full h-auto rounded-lg"
      />
      {visible && (
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none"
        />
      )}
    </div>
  );
}
