import { ImageResponse } from "next/og";

export const alt = "Fullstack — nền tảng Next.js hiện đại";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(135deg, #eff6ff 0%, #ffffff 55%, #e0e7ff 100%)",
          color: "#0f172a",
          display: "flex",
          height: "100%",
          padding: "80px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#1d4ed8", fontSize: 30, fontWeight: 700 }}>
            FULLSTACK
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            <div>Sản phẩm của bạn,</div>
            <div>xây dựng vững chắc.</div>
          </div>
          <div style={{ color: "#475569", fontSize: 28 }}>
            Next.js · Bảo mật · Trải nghiệm hiện đại
          </div>
        </div>
      </div>
    ),
    size,
  );
}
