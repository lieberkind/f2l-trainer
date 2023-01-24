import React from "react";
import { cubePNG, Masking } from "sr-visualizer";

export const Cube = ({
  scramble,
  width,
  height,
}: {
  scramble: string;
  width: number;
  height: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const refNode = ref.current;

    cubePNG(ref.current, {
      mask: Masking.F2L,
      algorithm: scramble,
      width,
      height,
    });

    return () => {
      refNode.innerHTML = "";
    };
  }, [scramble, width, height]);

  return <div ref={ref}></div>;
};
