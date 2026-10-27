import type { MetadataRoute } from "next";
import { getDeadlines } from "@/lib/deadlines";
import { subjects } from "@/lib/subjects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const deadlines = await getDeadlines();
  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/deadlines`, changeFrequency: "hourly", priority: 0.9 },
    ...deadlines.map((deadline) => ({
      url: `${baseUrl}/deadlines/${deadline.id}`,
      lastModified: new Date(deadline.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...subjects.map((subject) => ({ url: `${baseUrl}/subjects/${subject.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
