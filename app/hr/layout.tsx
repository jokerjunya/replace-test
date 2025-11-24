import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut, Sparkles } from "lucide-react";

export default function HRLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#0a0f1e] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#0a0f1e] flex flex-col fixed h-full z-50">
                <div className="p-6 flex items-center gap-2 border-b border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">Boss-Fit HR</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/hr"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/hr/simulator"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        <span>Placement Sim</span>
                    </Link>
                    <Link
                        href="/hr/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
