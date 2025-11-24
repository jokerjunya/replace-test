"use server";

import { prisma } from "@/lib/prisma";
import { Team, Candidate, Person, Trait, CandidateDetails } from "@/lib/mockData";

// Helper to map Prisma Trait to UI Trait
const mapTraits = (traits: any[]): Trait[] => {
    return traits.map((t: any) => ({
        id: t.trait.id,
        label: t.trait.label,
        color: t.trait.color || "bg-gray-500/20 text-gray-300",
    }));
};

// Helper to map Prisma Employee to Person
const mapEmployeeToPerson = (emp: any): Person => {
    return {
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        role: emp.role,
        avatar: emp.avatarUrl || "",
        traits: mapTraits(emp.traits),
        stressLevel: emp.stressLevel,
        performance: emp.performance,
        details: {
            resume: { education: [], workHistory: [], skills: [], certifications: [] }, // Placeholder or fetch if needed
            interview: [],
            preferences: { salary: "", startDate: "", workStyle: [], motivation: "" }
        }
    };
};

export async function getTeams(): Promise<Team[]> {
    const teams = await prisma.team.findMany({
        include: {
            leader: {
                include: {
                    traits: { include: { trait: true } }
                }
            },
            members: {
                include: {
                    traits: { include: { trait: true } }
                }
            }
        }
    });

    return teams.map(t => ({
        id: t.id,
        name: t.name,
        description: t.description || "",
        themeColor: t.themeColor || "from-gray-600 to-gray-500",
        metrics: {
            psychologicalSafety: t.psychologicalSafety,
            productivity: t.productivity,
            innovation: t.innovation,
        },
        leader: t.leader ? mapEmployeeToPerson(t.leader) : {} as Person, // Should handle null leader gracefully
        members: t.members.map(mapEmployeeToPerson),
    }));
}

export async function getCandidates(): Promise<Candidate[]> {
    const candidates = await prisma.candidate.findMany({
        include: {
            traits: { include: { trait: true } },
            matchResults: true,
        }
    });

    return candidates.map(c => {
        const resume = c.resumeJson ? JSON.parse(c.resumeJson) : undefined;
        const preferences = c.preferencesJson ? JSON.parse(c.preferencesJson) : undefined;

        // Construct details object
        const details: CandidateDetails = {
            resume: resume || { education: [], workHistory: [], skills: [], certifications: [] },
            interview: [], // Need to fetch interviews if we want them
            preferences: preferences || { salary: "", startDate: "", workStyle: [], motivation: "" }
        };

        const matchScores: Record<string, number> = {};
        c.matchResults.forEach(m => {
            matchScores[m.teamId] = m.score;
        });

        return {
            id: c.id,
            name: `${c.firstName} ${c.lastName}`,
            role: c.role,
            avatar: c.avatarUrl || "",
            traits: mapTraits(c.traits),
            stressLevel: 0, // Candidates start at 0
            performance: 0,
            status: c.status.toLowerCase() as "pending" | "assigned",
            assignedTeamId: c.assignedTeamId || undefined,
            matchScores,
            details
        };
    });
}
