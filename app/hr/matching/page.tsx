"use client";

import { motion } from "framer-motion";
import { MOCK_CANDIDATES, MOCK_TEAMS, Team, Candidate } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, TrendingUp, Users, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { CandidateDetailModal } from "@/components/hr/CandidateDetailModal";

export default function MatchingPage() {
    // Helper to find best match
    const getBestMatch = (candidate: Candidate) => {
        let bestTeamId = "";
        let highestScore = -1;

        Object.entries(candidate.matchScores).forEach(([teamId, score]) => {
            if (score > highestScore) {
                highestScore = score;
                bestTeamId = teamId;
            }
        });

        const team = MOCK_TEAMS.find(t => t.id === bestTeamId);
        return { team, score: highestScore };
    };

    // Helper to generate match reason (Mock logic for demo)
    const getMatchReason = (candidate: Candidate, team: Team) => {
        if (team.id === "team-alpha") return "イノベーション志向と高い創造性が、新規事業開発チームのカルチャーに完全に合致します。";
        if (team.id === "team-beta") return "着実な遂行能力と分析的思考が、基幹システムの安定運用において重要な役割を果たします。";
        if (team.id === "team-gamma") return "高い野心とリーダーシップ資質が、営業チームの目標達成意欲と強く共鳴します。";
        return "スキルセットとチームカルチャーの適合性が高いです。";
    };

    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Final Candidates Matching</h1>
                        <p className="text-muted-foreground mt-2">
                            最終候補者3名の最適配置シミュレーション
                        </p>
                    </div>
                    <Button variant="outline">
                        Export Report
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {MOCK_CANDIDATES.map((candidate, index) => {
                        const { team, score } = getBestMatch(candidate);
                        if (!team) return null;

                        return (
                            <motion.div
                                key={candidate.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden group">
                                    <div className={`h-2 w-full bg-gradient-to-r ${team.themeColor}`} />

                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <Avatar className="h-16 w-16 border-2 border-background shadow-lg">
                                                    <AvatarImage src={candidate.avatar} />
                                                    <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground">{candidate.role}</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {candidate.traits.slice(0, 2).map(trait => (
                                                            <Badge key={trait.id} variant="secondary" className={`text-xs ${trait.color} bg-opacity-10 border-0`}>
                                                                {trait.label}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-6">
                                        {/* Match Score Area */}
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/50 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                                <Star className="w-24 h-24" />
                                            </div>

                                            <div className="flex justify-between items-end mb-2 relative z-10">
                                                <span className="text-sm font-medium text-muted-foreground">Match Score</span>
                                                <span className="text-3xl font-bold text-primary">{score}%</span>
                                            </div>
                                            <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden relative z-10">
                                                <motion.div
                                                    className="bg-primary h-full rounded-full"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${score}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                                />
                                            </div>
                                        </div>

                                        {/* Boss/Team Info */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span>Best Fit Team & Boss</span>
                                            </div>

                                            <div className="flex items-center gap-4 p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
                                                <Avatar className="h-12 w-12 border border-border">
                                                    <AvatarImage src={team.leader.avatar} />
                                                    <AvatarFallback>{team.leader.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">{team.leader.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{team.name}</p>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>

                                        {/* Reason */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span>Why this match?</span>
                                            </div>
                                            <p className="text-sm leading-relaxed text-muted-foreground/90">
                                                {getMatchReason(candidate, team)}
                                            </p>
                                        </div>

                                        <Button
                                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                            variant="secondary"
                                            onClick={() => setSelectedCandidate(candidate)}
                                        >
                                            View Detailed Analysis
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                <CandidateDetailModal
                    candidate={selectedCandidate}
                    isOpen={!!selectedCandidate}
                    onClose={() => setSelectedCandidate(null)}
                />
            </div>
        </div>
    );
}
