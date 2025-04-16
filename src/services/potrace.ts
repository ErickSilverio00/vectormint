import potrace from "potrace";

export interface VectorizationResult {
  svgPath: string;
}

export async function vectorizeImage(
  imageFile: File
): Promise<VectorizationResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) {
        reject(new Error("Failed to read image file."));
        return;
      }

      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Could not get canvas context."));
          return;
        }

        context.drawImage(image, 0, 0);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        const [r0, g0, b0] = data.slice(0, 3);

        const tolerance = 30;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const isBackground =
            Math.abs(r - r0) < tolerance &&
            Math.abs(g - g0) < tolerance &&
            Math.abs(b - b0) < tolerance;

          if (isBackground) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          } else {
            data[i] = 0;
            data[i + 1] = 0;
            data[i + 2] = 0;
          }
        }

        context.putImageData(imageData, 0, 0);

        potrace.trace(canvas.toDataURL(), (err: Error | null, svg: string) => {
          if (err) {
            reject(err);
          } else {
            resolve({ svgPath: svg });
          }
        });
      };

      image.onerror = () => {
        reject(new Error("Failed to load image."));
      };

      image.src = event.target.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };

    reader.readAsDataURL(imageFile);
  });
}
