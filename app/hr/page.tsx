import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HRDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Organization Overview</h1>
                <p className="text-muted-foreground">現在の組織状態と配置待ちの候補者を確認できます。</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg. Psychological Safety
                        </CardTitle>
                        <Activity className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">84.2</div>
                        <p className="text-xs text-emerald-400 flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +2.1% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Employees
                        </CardTitle>
                        <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Across 12 teams
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending Placements
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-amber-400 mt-1">
                            Action required
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Retention Rate
                        </CardTitle>
                        <Activity className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">96.5%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Last 12 months
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity or Quick Actions could go here */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 text-white h-[300px]">
                    <CardHeader>
                        <CardTitle>Team Health Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-[200px] text-muted-foreground">
                        Chart Placeholder
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white h-[300px]">
                    <CardHeader>
                        <CardTitle>Placement Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-primary" />
                                        <span className="font-medium">Final Candidates</span>
                                    </div>
                                    <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">3 Pending</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    3名の最終候補者の配置シミュレーションが完了しました。
                                    それぞれの特性に最適な上司とのマッチング結果を確認できます。
                                </p>
                                <Link href="/hr/matching" className="block w-full">
                                    <button className="w-full py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                        View Matching Results
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
