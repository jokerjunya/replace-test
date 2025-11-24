"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star, TrendingUp, Shield, UserCheck, Loader2, Award, Users, BarChart3, Quote } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { findBestMatch, MatchResult, UserScores } from "@/app/lib/logic";
import { DIMENSIONS, Dimension, BOSS_PROFILES, type BossProfile } from "@/app/lib/constants";

export default function OfferPage() {
    const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
    const [userScores, setUserScores] = useState<UserScores | null>(null);
    const [boss, setBoss] = useState<BossProfile | null>(null);

    useEffect(() => {
        const storedScores = sessionStorage.getItem('userScores');
        if (storedScores) {
            const scores = JSON.parse(storedScores) as UserScores;
            setUserScores(scores);

            const result = findBestMatch(scores);
            setMatchResult(result);

            const foundBoss = BOSS_PROFILES.find(b => b.id === result.bossId);
            if (foundBoss) {
                setBoss(foundBoss);
            }
        }
    }, []);

    if (!matchResult || !userScores || !boss) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const chartData = Object.entries(DIMENSIONS).map(([key, label]) => ({
        subject: label.label,
        A: userScores[key as Dimension],
        B: boss.scores[key as Dimension],
        fullMark: 100,
    }));

    return (
        <div className="min-h-screen bg-background text-foreground p-4 md:p-8 overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto space-y-8"
            >
                {/* Header */}
                <div className="text-center space-y-2">
                    <Badge variant="outline" className="px-4 py-1 border-primary/50 text-primary bg-primary/10 backdrop-blur-md">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        マッチング成立
                    </Badge>
                    <h1 className="text-3xl md:text-5xl font-bold">「上司保証」オファー</h1>
                    <p className="text-muted-foreground">あなたのワークスタイルに基づき、この上司との配属を確約しました。</p>
                </div>

                {/* Boss Profile + Chart */}
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Card className="h-full border-primary/20 overflow-hidden relative bg-card">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Star className="w-32 h-32" />
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-4">
                                    <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${boss.imageColor} flex items-center justify-center text-3xl font-bold text-white shadow-lg`}>
                                        {boss.name.charAt(0)}
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl">{boss.name}</CardTitle>
                                        <p className="text-primary font-medium">{boss.role}</p>
                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {boss.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-4">
                                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                                    <h3 className="font-semibold mb-2 flex items-center">
                                        <UserCheck className="w-4 h-4 mr-2 text-primary" />
                                        マッチングの理由
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                        {matchResult.reason}
                                    </p>
                                    <p className="text-xs text-muted-foreground/80 leading-relaxed">
                                        {matchResult.detailedAnalysis}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>総合相性スコア</span>
                                        <span className="font-bold text-primary">{matchResult.matchScore}%</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${matchResult.matchScore}%` }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-white/10">
                                    <p className="text-sm italic text-center text-muted-foreground flex items-center justify-center gap-2">
                                        <Quote className="w-4 h-4" />
                                        {boss.catchphrase}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Compatibility Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Card className="h-full border-white/10 bg-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                                    適合性分析
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name="あなた"
                                            dataKey="A"
                                            stroke="var(--primary)"
                                            fill="var(--primary)"
                                            fillOpacity={0.3}
                                        />
                                        <Radar
                                            name={boss.name}
                                            dataKey="B"
                                            stroke="var(--secondary)"
                                            fill="var(--secondary)"
                                            fillOpacity={0.3}
                                        />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Multiple Scores */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="grid md:grid-cols-3 gap-4"
                >
                    <Card className="border-green-500/20 bg-green-500/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Award className="w-5 h-5 text-green-500" />
                                    成長性
                                </h3>
                                <span className="text-2xl font-bold text-green-500">{matchResult.growthScore}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchResult.growthScore}%` }}
                                    transition={{ delay: 0.7, duration: 1 }}
                                    className="h-full bg-green-500"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">スキルアップの機会</p>
                        </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-500" />
                                    安定性
                                </h3>
                                <span className="text-2xl font-bold text-blue-500">{matchResult.stabilityScore}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchResult.stabilityScore}%` }}
                                    transition={{ delay: 0.8, duration: 1 }}
                                    className="h-full bg-blue-500"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">心理的安全性</p>
                        </CardContent>
                    </Card>

                    <Card className="border-orange-500/20 bg-orange-500/5">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    チャレンジ度
                                </h3>
                                <span className="text-2xl font-bold text-orange-500">{matchResult.challengeScore}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${matchResult.challengeScore}%` }}
                                    transition={{ delay: 0.9, duration: 1 }}
                                    className="h-full bg-orange-500"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">刺激と挑戦の度合い</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                                チーム実績データ
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{boss.stats.averageTenure}</div>
                                    <div className="text-xs text-muted-foreground mt-1">平均勤続年数</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{boss.stats.promotionRate}</div>
                                    <div className="text-xs text-muted-foreground mt-1">昇進率</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{boss.stats.satisfactionScore}点</div>
                                    <div className="text-xs text-muted-foreground mt-1">満足度スコア</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{boss.stats.teamSize}名</div>
                                    <div className="text-xs text-muted-foreground mt-1">チーム規模</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Employee Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Card className="border-white/10 bg-white/5">
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <Users className="w-5 h-5 mr-2 text-primary" />
                                メンバーからの声
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                                {boss.reviews.map((review, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        className="p-4 rounded-lg bg-white/5 border border-white/10"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <div className="font-semibold text-sm">{review.employeeName}</div>
                                                <div className="text-xs text-muted-foreground">{review.role} • {review.tenure}</div>
                                            </div>
                                            <div className="flex">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                                            "{review.comment}"
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex justify-center pt-8 pb-12"
                >
                    <Button size="lg" className="text-lg px-12 py-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_50px_-10px_var(--color-primary)] transition-all hover:scale-105 animate-pulse">
                        <Shield className="w-6 h-6 mr-3" />
                        上司保証付きオファーを承諾する
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
