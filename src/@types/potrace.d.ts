declare module "potrace" {
  interface TraceOptions {
    turdSize?: number;
    threshold?: number;
    color?: string;
    background?: string;
    optTolerance?: number;
    [key: string]: string;
  }

  interface Potrace {
    trace(
      input: Buffer | string | ImageData,
      callback: (err: Error | null, svg: string) => void
    ): void;

    trace(
      input: Buffer | string | ImageData,
      options: TraceOptions,
      callback: (err: Error | null, svg: string) => void
    ): void;
  }

  const potrace: Potrace;
  export default potrace;
}
