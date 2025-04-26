import { GenerateRMSContentParams } from "@/hooks/useRMSContent";

function renderMap(
  ctx: CanvasRenderingContext2D,
  params: GenerateRMSContentParams
) {
  // 清空畫布
  ctx.clearRect(0, 0, 400, 400);

  // 地圖尺寸影響畫布大小（簡單模擬）
  const sizeMap = { TINY_MAP: 300, MEDIUM_MAP: 400, LARGE_MAP: 500 };
  const canvasSize = sizeMap[params.mapSize as keyof typeof sizeMap] || 400;
  ctx.canvas.width = canvasSize;
  ctx.canvas.height = canvasSize;

  // 基礎地形
  const terrainColors = {
    GRASS: "#90EE90",
    DESERT: "#F4A460",
    WATER: "#00B7EB",
  } as const;

  type TerrainType = keyof typeof terrainColors;
  const baseTerrain = params.baseTerrain as TerrainType;
  ctx.fillStyle = terrainColors[baseTerrain] || "#90EE90";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // 森林（模擬RMS的clumping_factor）
  const forestArea = (params.forestPercent / 100) * canvasSize * canvasSize;
  const forestClumps = Math.floor(forestArea / 200); // 每個樹叢200像素
  ctx.fillStyle = "#228B22";
  for (let i = 0; i < forestClumps; i++) {
    const x = Math.random() * canvasSize;
    const y = Math.random() * canvasSize;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // 水域
  const waterArea = (params.waterPercent / 100) * canvasSize * canvasSize;
  const waterClumps = Math.floor(waterArea / 400);
  ctx.fillStyle = "#00B7EB";
  for (let i = 0; i < waterClumps; i++) {
    const x = Math.random() * canvasSize;
    const y = Math.random() * canvasSize;
    ctx.fillRect(x, y, 20, 20);
  }

  // 遺物
  ctx.fillStyle = "#FFD700";
  for (let i = 0; i < params.relicCount; i++) {
    const x = Math.random() * canvasSize;
    const y = Math.random() * canvasSize;
    ctx.fillRect(x, y, 5, 5);
  }

  // 起始金礦
  const goldSizes = { None: 0, Small: 2, Medium: 4, Large: 6 } as const;
  ctx.fillStyle = "#FFA500";
  for (
    let i = 0;
    i < goldSizes[params.startingGold as keyof typeof goldSizes];
    i++
  ) {
    const x = Math.random() * canvasSize;
    const y = Math.random() * canvasSize;
    ctx.fillRect(x, y, 8, 8);
  }

  // 狩獵動物
  ctx.fillStyle = "#8B4513";
  for (let i = 0; i < params.huntableCount; i++) {
    const x = Math.random() * canvasSize;
    const y = Math.random() * canvasSize;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 高度變化（簡單陰影效果）
  if (params.elevationIntensity !== "Flat") {
    const hillCount =
      { Low: 5, Medium: 10, High: 20 }[params.elevationIntensity] ?? 0;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    for (let i = 0; i < hillCount; i++) {
      const x = Math.random() * canvasSize;
      const y = Math.random() * canvasSize;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export default renderMap;
