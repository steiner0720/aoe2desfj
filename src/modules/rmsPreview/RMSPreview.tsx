import { useEffect, useRef } from "react";

import { useFormContext } from "react-hook-form";

import { GenerateRMSContentParams } from "@/hooks/useRMSContent";

import renderMap from "./renderMap";

function RMSPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const form = useFormContext();
  const params = form.watch();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      renderMap(ctx, params as GenerateRMSContentParams);
    }
  }, [params]);
  return (
    <div>
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}

export default RMSPreview;
