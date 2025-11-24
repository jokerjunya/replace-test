"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Star, TrendingUp, Shield, Zap, Award } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import { findBestMatch, MatchResult, UserScores } from "@/app/lib/logic";
import { BOSS_PROFILES, DIMENSIONS } from "@/app/lib/constants";

export default function OfferPage() {
    const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
    const [userScores, setUserScores] = useState<UserScores | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedScores = sessionStorage.getItem("userScores");
        if (storedScores) {
            const scores = JSON.parse(storedScores) as UserScores;
            setUserScores(scores);
            const result = findBestMatch(scores);
            setMatchResult(result);
        } else {
            router.push("/diagnosis");
        }
    }, [router]);

    if (!matchResult || !userScores) {
        return null; // Or a loading spinner
    }

    const boss = BOSS_PROFILES.find((b) => b.id === matchResult.bossId)!;

    // Data for Radar Chart
    const chartData = Object.keys(DIMENSIONS).map((key) => {
        const dim = key as keyof UserScores;
        return {
            subject: DIMENSIONS[dim].label,
            A: userScores[dim],
            B: boss.scores[dim],
            fullMark: 100,
        };
    });

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Hero Section with Match Result */}
            <section className="relative pt-20 pb-32 px-4">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className={`absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br ${boss.imageColor} opacity-20 rounded-full blur-[120px]`} />
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/30 bg-primary/10 backdrop-blur-md">
                            マッチング完了
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            あなたに最適な上司が見つかりました
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            AIによる分析の結果、あなたの才能を最も引き出せるパートナーを選出しました。
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Boss Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="lg:col-span-5"
                        >
                            <Card className="bg-white/5 border-white/10 overflow-hidden backdrop-blur-md h-full">
                                <div className={`h-32 bg-gradient-to-r ${boss.imageColor} relative`}>
                                    <div className="absolute -bottom-16 left-8">
                                        <div className="w-32 h-32 rounded-full border-4 border-background bg-zinc-800 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                                            {boss.name[0]}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="pt-20 px-8 pb-8">
                                    <h2 className="text-3xl font-bold mb-1">{boss.name}</h2>
                                    <p className="text-primary font-medium mb-4">{boss.role}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {boss.tags.map((tag, i) => (
                                            <Badge key={i} variant="secondary" className="bg-white/10 hover:bg-white/20">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                                            "{boss.catchphrase}"
                                        </blockquote>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {boss.managementPhilosophy}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                            <div className="text-2xl font-bold text-white">{boss.stats.satisfactionScore}</div>
                                            <div className="text-xs text-muted-foreground">チーム満足度</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                            <div className="text-2xl font-bold text-white">{boss.stats.promotionRate}</div>
                                            <div className="text-xs text-muted-foreground">昇進率</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Matching Analysis */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="lg:col-span-7 space-y-6"
                        >
                            {/* Match Score Card */}
                            <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                <CardContent className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">マッチングスコア</h3>
                                            <p className="text-muted-foreground">あなたと{boss.name}さんの適合率</p>
                                        </div>
                                        <div className="relative flex items-center justify-center w-24 h-24">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="48"
                                                    cy="48"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    fill="transparent"
                                                    className="text-white/10"
                                                />
                                                <circle
                                                    cx="48"
                                                    cy="48"
                                                    r="40"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    fill="transparent"
                                                    strokeDasharray={251.2}
                                                    strokeDashoffset={251.2 - (251.2 * matchResult.matchScore) / 100}
                                                    className="text-primary transition-all duration-1000 ease-out"
                                                />
                                            </svg>
                                            <span className="absolute text-3xl font-bold">{matchResult.matchScore}%</span>
                                        </div>
                                    </div>

                                    <div className="h-[300px] w-full mb-8">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                                <Radar
                                                    name="あなた"
                                                    dataKey="A"
                                                    stroke="#8884d8"
                                                    strokeWidth={2}
                                                    fill="#8884d8"
                                                    fillOpacity={0.3}
                                                />
                                                <Radar
                                                    name={boss.name}
                                                    dataKey="B"
                                                    stroke="#10b981"
                                                    strokeWidth={2}
                                                    fill="#10b981"
                                                    fillOpacity={0.3}
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                        <div className="flex justify-center gap-6 text-sm mt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#8884d8]" />
                                                <span className="text-muted-foreground">あなた</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                                                <span className="text-muted-foreground">{boss.name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <Star className="w-5 h-5 text-yellow-400" />
                                            マッチングのポイント
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {matchResult.reason}
                                        </p>
                                        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                                            <p className="text-sm text-primary-foreground/90">
                                                {matchResult.detailedAnalysis}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                    <CardContent className="p-4 text-center">
                                        <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">{matchResult.growthScore}</div>
                                        <div className="text-xs text-muted-foreground">成長期待度</div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                    <CardContent className="p-4 text-center">
                                        <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">{matchResult.stabilityScore}</div>
                                        <div className="text-xs text-muted-foreground">心理的安全性</div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/5 border-white/10 backdrop-blur-md">
                                    <CardContent className="p-4 text-center">
                                        <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">{matchResult.challengeScore}</div>
                                        <div className="text-xs text-muted-foreground">挑戦レベル</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-16 text-center"
                    >
                        <Link href="/">
                            <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-white text-black hover:bg-white/90 transition-all hover:scale-105">
                                トップに戻る
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
