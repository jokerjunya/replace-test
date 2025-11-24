"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, ArrowRight, UserCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getCandidates, getTeams } from "@/app/actions";
import { Candidate, Team } from "@/lib/mockData";

export default function MatchingPage() {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const [c, t] = await Promise.all([getCandidates(), getTeams()]);
            setCandidates(c);
            setTeams(t);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredCandidates = candidates.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Matching Candidates</h1>
                    <p className="text-muted-foreground">候補者とチームの適合度を分析し、最適な配置を決定します。</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            placeholder="Search candidates..."
                            className="pl-9 bg-white/5 border-white/10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="border-white/10 bg-white/5">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredCandidates.map((candidate, index) => (
                    <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-white/5 border-white/10 overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Candidate Info */}
                                    <div className="flex-1 min-w-[300px]">
                                        <div className="flex items-start gap-4 mb-4">
                                            <Avatar className="w-16 h-16 border-2 border-primary/20">
                                                <AvatarImage src={candidate.avatar} />
                                                <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
                                                <p className="text-primary">{candidate.role}</p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {candidate.traits.map(t => (
                                                        <Badge key={t.id} variant="secondary" className={`text-xs ${t.color}`}>
                                                            {t.label}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground bg-black/20 p-4 rounded-lg">
                                            <div>
                                                <span className="block text-xs opacity-70">希望年収</span>
                                                <span className="text-white">{candidate.details?.preferences.salary}</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs opacity-70">入社可能時期</span>
                                                <span className="text-white">{candidate.details?.preferences.startDate}</span>
                                            </div>
                                            <div className="col-span-2">
                                                <span className="block text-xs opacity-70">モチベーション</span>
                                                <span className="text-white">{candidate.details?.preferences.motivation}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Matching Scores */}
                                    <div className="flex-[2] grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {teams.map(team => {
                                            const score = candidate.matchScores[team.id] || 0;
                                            let scoreColor = "text-muted-foreground";
                                            let barColor = "bg-muted";

                                            if (score >= 80) {
                                                scoreColor = "text-emerald-400";
                                                barColor = "bg-emerald-500";
                                            } else if (score >= 60) {
                                                scoreColor = "text-amber-400";
                                                barColor = "bg-amber-500";
                                            }

                                            return (
                                                <div key={team.id} className="bg-white/5 rounded-lg p-4 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group relative overflow-hidden">
                                                    <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${team.themeColor}`} />
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-medium text-sm text-white truncate pr-2">{team.name}</h4>
                                                        <span className={`text-lg font-bold ${scoreColor}`}>{score}%</span>
                                                    </div>
                                                    <Progress value={score} className="h-1.5 mb-3 bg-white/10" indicatorClassName={barColor} />

                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                        <Avatar className="w-5 h-5">
                                                            <AvatarImage src={team.leader.avatar} />
                                                        </Avatar>
                                                        <span className="truncate">{team.leader.name}</span>
                                                    </div>

                                                    <Button size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-0 h-8 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                        詳細を見る
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
