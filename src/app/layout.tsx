import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "Deadline Hub — Lịch học tập của lớp",
    template: "%s | Deadline Hub",
  },
  description: "Theo dõi deadline môn học, bài tập và lịch nộp bài của lớp một cách dễ dàng.",
  applicationName: "Deadline Hub",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Deadline Hub",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} font-sans antialiased`}><Providers>{children}</Providers></body>
    </html>
  );
}
