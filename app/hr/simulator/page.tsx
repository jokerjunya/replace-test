"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_TEAMS, MOCK_CANDIDATES, Team, Candidate, Person } from "@/lib/mockData";
import { TeamCard } from "@/components/hr/TeamCard";
import { CandidateCard } from "@/components/hr/CandidateCard";
import { PersonDetailModal } from "@/components/hr/PersonDetailModal";
import { Sparkles, RefreshCw, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SimulatorPage() {
    const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS);
    const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
    const [isSimulating, setIsSimulating] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    // Refs for drop zones (Team Cards)
    const teamRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleDragEnd = (candidateId: string, info: any) => {
        const dropPoint = {
            x: info.point.x,
            y: info.point.y,
        };

        // Simple collision detection
        let droppedTeamId: string | undefined;

        for (const team of teams) {
            const element = teamRefs.current[team.id];
            if (element) {
                const rect = element.getBoundingClientRect();
                if (
                    dropPoint.x >= rect.left &&
                    dropPoint.x <= rect.right &&
                    dropPoint.y >= rect.top &&
                    dropPoint.y <= rect.bottom
                ) {
                    droppedTeamId = team.id;
                    break;
                }
            }
        }

        if (droppedTeamId) {
            assignCandidate(candidateId, droppedTeamId);
        }
    };

    const assignCandidate = (candidateId: string, teamId: string) => {
        setCandidates((prev) =>
            prev.map((c) =>
                c.id === candidateId
                    ? { ...c, status: "assigned", assignedTeamId: teamId }
                    : c
            )
        );
    };

    const handleAutoAssign = async () => {
        setIsSimulating(true);

        // Simulate calculation delay for effect
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newCandidates = [...candidates];

        // Simple greedy algorithm: assign to highest match score
        newCandidates.forEach((candidate) => {
            if (candidate.status === "pending") {
                let bestTeamId = "";
                let bestScore = -1;

                Object.entries(candidate.matchScores).forEach(([tId, score]) => {
                    if (score > bestScore) {
                        bestScore = score;
                        bestTeamId = tId;
                    }
                });

                if (bestTeamId) {
                    candidate.status = "assigned";
                    candidate.assignedTeamId = bestTeamId;
                }
            }
        });

        setCandidates(newCandidates);
        setIsSimulating(false);
    };

    const handleReset = () => {
        setCandidates(MOCK_CANDIDATES.map(c => ({ ...c, status: "pending", assignedTeamId: undefined })));
    };

    const pendingCandidates = candidates.filter((c) => c.status === "pending");

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Team Placement Simulator</h1>
                    <p className="text-muted-foreground">
                        AIが候補者の特性とチームの相性を分析し、最適な配置を提案します。
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="border-white/10 text-white hover:bg-white/10"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleAutoAssign}
                        disabled={isSimulating || pendingCandidates.length === 0}
                        className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_var(--color-primary)]"
                    >
                        {isSimulating ? (
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        Auto Assign All
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-8 h-full overflow-hidden">
                {/* Left Panel: Waiting Room */}
                <div className="w-80 flex flex-col bg-white/5 rounded-2xl border border-white/10 p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-white flex items-center gap-2">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            Waiting Room
                        </h2>
                        <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-white">
                            {pendingCandidates.length}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        <AnimatePresence>
                            {pendingCandidates.map((candidate) => (
                                <CandidateCard
                                    key={candidate.id}
                                    candidate={candidate}
                                    onDragEnd={(info) => handleDragEnd(candidate.id, info)} // Pass info from framer motion
                                    onClick={() => setSelectedPerson(candidate)}
                                />
                            ))}
                        </AnimatePresence>

                        {pendingCandidates.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground border-2 border-dashed border-white/10 rounded-xl">
                                <p>No pending candidates</p>
                                <Button variant="link" onClick={handleReset} className="text-primary">
                                    Reset Simulation
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Teams Grid */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                ref={(el) => { teamRefs.current[team.id] = el; }} // Assign ref
                            >
                                <TeamCard
                                    team={team}
                                    candidates={candidates.filter(
                                        (c) => c.assignedTeamId === team.id
                                    )}
                                    onMemberClick={setSelectedPerson}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <PersonDetailModal
                person={selectedPerson}
                isOpen={!!selectedPerson}
                onClose={() => setSelectedPerson(null)}
            />
        </div>
    );
}
