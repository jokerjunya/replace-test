"use client";

import { motion } from "framer-motion";
import { Team, Candidate } from "@/lib/mockData";
import { Users, Zap, Shield, Crown } from "lucide-react";

interface TeamCardProps {
    team: Team;
    candidates: Candidate[]; // Candidates currently assigned (simulated) to this team
    isOver?: boolean; // Is a draggable item currently hovering over this card?
    onDrop?: (candidateId: string) => void; // Callback when a candidate is dropped here
}

export function TeamCard({ team, candidates, isOver }: TeamCardProps) {
    // Calculate simulated metrics (simplified logic for demo)
    // In a real app, this would be complex. Here we just boost metrics based on candidate count/traits.
    const bonus = candidates.length * 2;
    const currentSafety = Math.min(100, team.metrics.psychologicalSafety + bonus);
    const currentProductivity = Math.min(100, team.metrics.productivity + (candidates.length > 0 ? -1 : 0)); // Slight dip for onboarding?

    return (
        <motion.div
            animate={{
                scale: isOver ? 1.02 : 1,
                borderColor: isOver ? "rgba(var(--primary-rgb), 0.8)" : "rgba(255,255,255,0.1)"
            }}
            className={`relative rounded-2xl border bg-gradient-to-br ${team.themeColor.replace("from-", "from-black/40 ").replace("to-", "to-black/40 ")} border-white/10 overflow-hidden transition-colors`}
        >
            {/* Header / Leader Section */}
            <div className={`p-5 bg-gradient-to-r ${team.themeColor} opacity-90 text-white`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold">{team.name}</h3>
                        <p className="text-sm opacity-90">{team.description}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {team.members.length + candidates.length} Members
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl backdrop-blur-sm">
                    <div className="relative">
                        <img src={team.leader.avatar} alt={team.leader.name} className="w-12 h-12 rounded-full border-2 border-white/30" />
                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black p-0.5 rounded-full">
                            <Crown className="w-3 h-3" />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs opacity-70">Team Leader</p>
                        <p className="font-bold">{team.leader.name}</p>
                    </div>
                </div>
            </div>

            {/* Metrics & Members */}
            <div className="p-5 space-y-6 bg-[#0a0f1e]/80 backdrop-blur-xl h-full">
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                        <Shield className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                        <div className="text-lg font-bold text-white">{currentSafety}</div>
                        <div className="text-[10px] text-muted-foreground">Safety</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                        <Zap className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                        <div className="text-lg font-bold text-white">{currentProductivity}</div>
                        <div className="text-[10px] text-muted-foreground">Velocity</div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-lg text-center">
                        <Users className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                        <div className="text-lg font-bold text-white">{team.metrics.innovation}</div>
                        <div className="text-[10px] text-muted-foreground">Innovation</div>
                    </div>
                </div>

                {/* Members List (Existing + New) */}
                <div>
                    <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Team Members</p>
                    <div className="flex flex-wrap gap-2">
                        {team.members.map((member) => (
                            <div key={member.id} className="relative group">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-8 h-8 rounded-full border border-white/10 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                                />
                            </div>
                        ))}

                        {/* Newly Assigned Candidates */}
                        {candidates.map((candidate) => (
                            <motion.div
                                key={candidate.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative"
                            >
                                <img
                                    src={candidate.avatar}
                                    alt={candidate.name}
                                    className="w-8 h-8 rounded-full border-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
