export type ImageColorScheme = "dark" | "light" | "color";

export type ImageColorSchemeOptions = {
  context?: CanvasRenderingContext2D;
  sampleCount?: number;
  canvasSize?: number;
  colorThreshold?: number;
};

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

const DEFAULT_SAMPLE_COUNT = 23;
const DEFAULT_CANVAS_SIZE = 16;
const DEFAULT_COLOR_THRESHOLD = 0.1;

const getContext = () => {
  canvas ||= document.createElement("canvas");
  context ||= canvas.getContext("2d", { willReadFrequently: true });
  return context;
};

export const getImageColorScheme = (
  image: CanvasImageSource,
  options?: ImageColorSchemeOptions
): ImageColorScheme => {
  const ctx = options?.context || getContext();

  if (!ctx) {
    return "color";
  }

  const sampleCount = options?.sampleCount || DEFAULT_SAMPLE_COUNT;
  const canvasSize = options?.canvasSize || DEFAULT_CANVAS_SIZE;
  const colorThreshold = options?.colorThreshold || DEFAULT_COLOR_THRESHOLD;

  ctx.canvas.width = canvasSize;
  ctx.canvas.height = canvasSize;

  ctx.clearRect(0, 0, canvasSize, canvasSize);
  ctx.drawImage(image, 0, 0, canvasSize, canvasSize);

  const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize, {
    colorSpace: "srgb",
  });
  const stepSize = Math.floor(imageData.data.length / 4 / sampleCount) * 4;

  let light = 0,
    dark = 0,
    color = 0;

  for (let i = 0; i < imageData.data.length; i += stepSize) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3] / 255;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const isColor = (max !== 0 ? (max - min) / 255 : 0) > colorThreshold;

    if (isColor) {
      color += a;
    } else {
      const isDark = (r * 2126 + g * 7152 + b * 722) / 10000 < 128;
      if (isDark) {
        dark += a;
      } else {
        light += a;
      }
    }
  }

  const maxSchemeValue = Math.max(dark, light, color);

  if (maxSchemeValue === dark) {
    return "dark";
  } else if (maxSchemeValue === light) {
    return "light";
  } else {
    return "color";
  }
};
