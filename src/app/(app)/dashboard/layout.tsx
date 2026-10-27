import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  return <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 lg:flex-row lg:gap-7 lg:px-8 lg:py-9"><AppSidebar isAdmin={session?.user.role === "admin"} /><div className="min-w-0 flex-1">{children}</div></div>;
}
