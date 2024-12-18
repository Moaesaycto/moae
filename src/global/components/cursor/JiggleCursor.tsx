import React, { useEffect, useRef } from 'react';

interface JiggleCursorProps {
  followSpeed?: number;
}

const JiggleCursor: React.FC<JiggleCursorProps> = ({ followSpeed = 0.6 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    // Configuration
    const len = 10;          // Length of the trail
    const baseRadius = 5;   // Base radius of the main circle
    const hoverRadius = 10;  // Larger radius when hovering over interactable elements
    const baseColor = '#2ECC71';     // A nice green by default
    const hoverColor = '#E74C3C';    // Red when hovering over clickable elements

    // Initialize trail points
    let points = Array.from({ length: len }, () => ({ x: W / 2, y: H / 2 }));

    let mouseX = W / 2;
    let mouseY = H / 2;
    let isHoveringInteractable = false;
    let currentRadius = baseRadius;
    let currentColor = baseColor;
    let rafId: number;

    // Linear interpolation function
    const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

    // Detect if hovered element is clickable
    const checkInteractable = (el: Element | null) => {
      if (!el) return false;
      const clickableSelectors = 'a, button, [role="button"], input, select, textarea';
      return el.matches(clickableSelectors) || el.closest(clickableSelectors) !== null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const hoveredEl = document.elementFromPoint(mouseX, mouseY);
      isHoveringInteractable = checkInteractable(hoveredEl);
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Move the head of the trail to the mouse
      points[0] = { x: mouseX, y: mouseY };

      // Smoothly move trailing points towards the point ahead of them
      for (let i = 1; i < len; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        points[i].x += dx * followSpeed;
        points[i].y += dy * followSpeed;
      }

      // Interpolate radius and color
      const targetRadius = isHoveringInteractable ? hoverRadius : baseRadius;
      currentRadius = lerp(currentRadius, targetRadius, 0.1);

      const targetColor = isHoveringInteractable ? hoverColor : baseColor;
      currentColor = lerpColor(currentColor, targetColor, 0.1);

      // Create a gooey effect by using blending and a blur filter
      ctx.globalCompositeOperation = 'lighter';
      ctx.filter = 'blur(8px)';
      ctx.globalAlpha = 0.7;

      // Draw trailing circles
      for (let i = 0; i < len; i++) {
        const p = points[i];
        const r = currentRadius * (1 - i / len) + 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = currentColor;
        ctx.fill();
      }

      // Reset filters for the main circle
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;

      // Draw a crisp main circle at the head
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = currentColor;
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [followSpeed]);

  // Helper function to interpolate colors
  const lerpColor = (a: string, b: string, amount: number) => {
    const ah = parseInt(a.replace(/#/g, ''), 16);
    const ar = ah >> 16;
    const ag = (ah >> 8) & 0xff;
    const ab = ah & 0xff;

    const bh = parseInt(b.replace(/#/g, ''), 16);
    const br = bh >> 16;
    const bg = (bh >> 8) & 0xff;
    const bb = bh & 0xff;

    const rr = ar + amount * (br - ar);
    const rg = ag + amount * (bg - ag);
    const rb = ab + amount * (bb - ab);

    return `#${((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1)}`;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default JiggleCursor;
