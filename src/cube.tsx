import React from "react";
import { Axis, cubeSVG, Face, Masking } from "sr-visualizer";

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

    cubeSVG(ref.current, {
      colorScheme: {
        [Face.U]: "#FEFE00",
        [Face.R]: "#00D800",
        [Face.F]: "#EE0000",
        [Face.D]: "#FFFFFF",
        [Face.L]: "#0000F2",
        [Face.B]: "#FFA100",
      },
      mask: Masking.F2L,
      algorithm: scramble,
      width,
      height,
      viewportRotations: [
        [Axis.Y, 30],
        [Axis.X, -20],
      ],
    });

    return () => {
      refNode.innerHTML = "";
    };
  }, [scramble, width, height]);

  return <div ref={ref}></div>;
};
