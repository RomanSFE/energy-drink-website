import * as THREE from "three";

export function generateCanLabelTexture(
  accentColor: string,
  secondaryGlow: string
): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // 1. Deep Obsidian Matte Black Base
  ctx.fillStyle = "#040404";
  ctx.fillRect(0, 0, width, height);

  // Center of the canvas (front facing when mesh rotation.y = 0)
  const cx = width * 0.5;
  const cy = height * 0.5;

  // 2. Center Glow & Electric Plasma Behind Lightning Bolt
  const outerGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 380);
  outerGlow.addColorStop(0, accentColor);
  outerGlow.addColorStop(0.4, secondaryGlow);
  outerGlow.addColorStop(0.8, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = outerGlow;
  ctx.fillRect(cx - 500, 0, 1000, height);

  // 3. Jagged Electric Lightning Tendrils
  ctx.save();
  ctx.strokeStyle = "#ffffff";
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 18;

  const drawArc = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    segments: number,
    jitter: number,
    lineWidth: number
  ) => {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(startX, startY);
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const bx = startX + (endX - startX) * t;
      const by = startY + (endY - startY) * t;
      const offset = Math.sin(i * 17.7 + startX) * jitter;
      const offsetY = Math.cos(i * 11.3 + startY) * jitter;
      ctx.lineTo(bx + offset, by + offsetY);
    }
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  drawArc(cx - 40, cy - 30, cx - 240, cy - 280, 12, 22, 3);
  drawArc(cx + 40, cy - 20, cx + 230, cy - 290, 12, 24, 3.5);
  drawArc(cx + 60, cy + 40, cx + 260, cy + 270, 12, 20, 3);
  drawArc(cx - 60, cy + 40, cx - 230, cy + 290, 12, 22, 2.5);

  ctx.strokeStyle = accentColor;
  drawArc(cx - 90, cy - 10, cx - 290, cy - 170, 10, 26, 2);
  drawArc(cx + 90, cy + 10, cx + 290, cy + 180, 10, 26, 2);
  ctx.restore();

  // 4. Hero 3D Chiseled Lightning Bolt (Center)
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 2);

  const boltPoints: [number, number][] = [
    [-220, -140],
    [45, -16],
    [-28, -175],
    [235, 140],
    [-38, 16],
    [32, 175],
  ];

  ctx.beginPath();
  boltPoints.forEach(([x, y], idx) =>
    idx === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  );
  ctx.closePath();
  ctx.shadowColor = accentColor;
  ctx.shadowBlur = 24;
  ctx.lineWidth = 10;
  ctx.strokeStyle = accentColor;
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();

  const bevelGrad = ctx.createLinearGradient(-200, -150, 200, 150);
  bevelGrad.addColorStop(0, "#1c2205");
  bevelGrad.addColorStop(0.35, "#050505");
  bevelGrad.addColorStop(0.5, accentColor);
  bevelGrad.addColorStop(0.65, "#050505");
  bevelGrad.addColorStop(1, "#181d04");
  ctx.fillStyle = bevelGrad;
  ctx.fill();
  ctx.restore();

  // 5. Left Side Brand Lockup ("NITRO" + "ENERGY DRINK")
  // Shifted properly to the left sector (cx - 450) and oriented horizontally
  ctx.save();
  ctx.translate(cx - 460, cy);
  ctx.rotate(-Math.PI / 2);

  ctx.font = "italic 900 130px Impact, 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const nitW = ctx.measureText("NIT").width;
  const startX = -ctx.measureText("NITRO").width / 2;

  const silverGrad = ctx.createLinearGradient(0, -60, 0, 60);
  silverGrad.addColorStop(0, "#ffffff");
  silverGrad.addColorStop(0.5, "#d4d4d8");
  silverGrad.addColorStop(1, "#52525b");

  ctx.textAlign = "left";
  ctx.fillStyle = silverGrad;
  ctx.fillText("NIT", startX, 0);

  ctx.fillStyle = accentColor;
  ctx.fillText("RO", startX + nitW - 6, 0);

  ctx.textAlign = "center";
  ctx.font = "700 20px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillText("E N E R G Y    D R I N K", 0, 85);
  ctx.restore();

  // 6. Right Side Specs ("ZERO SUGAR - FLAVOUR")
  ctx.save();
  ctx.translate(cx + 480, cy);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.font = "700 18px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillText("ZERO SUGAR   -   FLAVOUR", 0, 0);
  ctx.restore();

  // 7. Water Droplets Across Texture
  for (let i = 0; i < 220; i++) {
    const dx = ((i * 397) % 1800) + 120;
    const dy = ((i * 613) % 900) + 60;
    const r = 1.5 + (i % 4) * 1.3;

    ctx.beginPath();
    ctx.arc(dx + 1.5, dy + 2, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dx, dy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(dx - r * 0.35, dy - r * 0.35, r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}