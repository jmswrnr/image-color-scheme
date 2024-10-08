[![NPM Version](https://img.shields.io/npm/v/image-color-scheme?logo=npm&label=%20&labelColor=%23cb0000&color=%23cb0000)](https://www.npmjs.com/package/image-color-scheme)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/image-color-scheme?labelColor=%2322212C&color=%238aff80)](https://bundlephobia.com/package/image-color-scheme)
[![Static Badge](https://img.shields.io/badge/Made_by_James_Warner-000000?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyMHB4IiBmaWxsPSIjZThlYWVkIj48cGF0aCBkPSJNNDgwLTQ4MHEtNjAgMC0xMDItNDJ0LTQyLTEwMnEwLTYwIDQyLTEwMnQxMDItNDJxNjAgMCAxMDIgNDJ0NDIgMTAycTAgNjAtNDIgMTAydC0xMDIgNDJaTTE5Mi0xOTJ2LTk2cTAtMjMgMTIuNS00My41VDIzOS0zNjZxNTUtMzIgMTE2LjUtNDlUNDgwLTQzMnE2MyAwIDEyNC41IDE3VDcyMS0zNjZxMjIgMTMgMzQuNSAzNHQxMi41IDQ0djk2SDE5MloiLz48L3N2Zz4%3D)](https://jmswrnr.com/)
[![Static Badge](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?logo=buymeacoffee&logoColor=000)](https://buymeacoffee.com/jmswrnr)

# image-color-scheme

Handy utility for detecting the color scheme of an image `"dark" | "light" | "color"`.

## Install

### ES Module

```bash
npm install image-color-scheme
```

## Example Usage

The most common use case for this utility is to invert an icon to contrast with the page theme. This is useful for dynamically-fetched images which would otherwise require manual configuration based on their color scheme. 

Here's how I do this in React & CSS Modules:

### React

```tsx
import { ImageColorScheme, getImageColorScheme } from "image-color-scheme";
import styles from "./InvertingIcon.module.css";

export const InvertingIcon = () => {
  const [colorScheme, setColorScheme] = useState<ImageColorScheme>("color");

  return (
    <img
      src="/some-image.png"
      className={styles[colorScheme]}
      onLoad={(e) => {
        setColorScheme(getImageColorScheme(e.currentTarget));
      }}
    />
  );
};
```

### CSS

If the icon color scheme matches the theme, invert the icon to maximize contrast:

```css
@media (prefers-color-scheme: dark) {
  .dark {
    filter: invert(1);
  }
}

@media (prefers-color-scheme: light) {
  .light {
    filter: invert(1);
  }
}
```

This will not invert colored icons as they are detected as `"color"` scheme.

## Options

```ts
getImageColorScheme(image, options);
```

- `context`: Use a custom `CanvasRenderingContext2D`.
- `sampleCount`: Specify number of pixel samples, default: `23`.
- `canvasSize`: Specify the canvas resolution, default: `16`.
- `colorThreshold`: Normalized saturation amount to consider a pixel as colorful, value `0-1`, default: `0.1`.
