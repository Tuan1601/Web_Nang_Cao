import { ImageResponse } from "next/og";
import { getDeadline } from "@/lib/deadlines";
import { subjects } from "@/lib/subjects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deadline = await getDeadline(id);
  const subject = subjects.find((item) => item.slug === deadline?.subjectSlug);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f8ff", padding: "64px", color: "#172333", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", borderRadius: "36px", border: "2px solid #dce7ff", background: "white", padding: "54px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", color: "#3268e8", fontSize: 24, fontWeight: 700 }}>
          <div style={{ display: "flex", width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", background: "#3268e8", color: "white" }}>D</div>
          deadlinehub
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ color: "#3268e8", fontSize: 22, fontWeight: 700 }}>{subject?.code ?? "DEADLINE"} · {subject?.name ?? "Môn học"}</div>
          <div style={{ display: "flex", maxWidth: 950, fontSize: 54, lineHeight: 1.2, fontWeight: 700 }}>{deadline?.title ?? "Deadline học tập"}</div>
          <div style={{ color: "#687789", fontSize: 24 }}>{deadline?.type ?? "Thông tin deadline"} · Lịch học tập của lớp</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#21a67a", fontSize: 22, fontWeight: 600 }}>● Theo dõi deadline · Chủ động hoàn thành</div>
      </div>
    </div>,
    size,
  );
}
