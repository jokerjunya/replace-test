"use client";

import { motion, PanInfo } from "framer-motion";
import { Candidate } from "@/lib/mockData";
import { GripVertical } from "lucide-react";

interface CandidateCardProps {
    candidate: Candidate;
    onDragStart?: () => void;
    onDragEnd?: (info: PanInfo) => void; // teamId is undefined if dropped outside
}

export function CandidateCard({ candidate, onDragStart, onDragEnd }: CandidateCardProps) {
    return (
        <motion.div
            layoutId={candidate.id}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            dragSnapToOrigin={true} // We'll handle the "drop" logic by state change, so snap back if not valid
            whileDrag={{ scale: 1.05, zIndex: 100, cursor: "grabbing" }}
            onDragStart={onDragStart}
            onDragEnd={(_, info) => {
                // Simple heuristic: if dropped over a valid drop zone (handled by parent usually, 
                // but here we might just rely on the parent checking the pointer coordinates or 
                // using a more robust dnd library. For this MVP with Framer Motion, 
                // we often check collision in the parent or use onViewportBoxUpdate.
                // For simplicity in this step, we'll just trigger the end callback.)
                if (onDragEnd) onDragEnd(info);
            }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:bg-white/10 transition-colors group relative overflow-hidden"
        >
            <div className="flex items-start gap-3">
                <div className="mt-1 text-muted-foreground group-hover:text-white transition-colors">
                    <GripVertical className="w-5 h-5" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-10 h-10 rounded-full bg-white/10"
                        />
                        <div>
                            <h3 className="font-bold text-white">{candidate.name}</h3>
                            <p className="text-xs text-muted-foreground">{candidate.role}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {candidate.traits.map((trait) => (
                            <span
                                key={trait.id}
                                className={`text-[10px] px-2 py-0.5 rounded-full ${trait.color}`}
                            >
                                {trait.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
