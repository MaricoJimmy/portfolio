import { ImageResponse } from "next/og";

export const alt = "Vu Van Tung — AI & Software Engineering Portfolio";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#d9d9d6",
        display: "flex",
        height: "100%",
        padding: 42,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: "#101011",
          borderRadius: 42,
          color: "#f5f4ef",
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          overflow: "hidden",
          padding: 58,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "62%" }}>
          <span style={{ color: "#6be7ff", fontSize: 22, letterSpacing: 5 }}>AI / SOFTWARE ENGINEERING</span>
          <span style={{ fontSize: 88, fontWeight: 800, letterSpacing: -7, lineHeight: 0.9, marginTop: 70 }}>
            VU VAN TUNG
          </span>
          <span style={{ color: "#a6a6ad", fontSize: 26, marginTop: 35 }}>
            Computer vision systems built with measurable evidence.
          </span>
        </div>
        <div
          style={{
            alignItems: "center",
            background: "#7164e8",
            borderRadius: 34,
            display: "flex",
            fontSize: 70,
            fontWeight: 800,
            height: 410,
            justifyContent: "center",
            width: 330,
          }}
        >
          AI
        </div>
      </div>
    </div>,
    size,
  );
}
