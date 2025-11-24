
import { BOSS_PROFILES, Dimension, DIMENSIONS, MATCHING_TEMPLATES, QuestionOption, DIMENSION_WEIGHTS } from "./constants";

export interface UserScores {
    action: number;
    communication: number;
    management: number;
    environment: number;
    feedback: number;
    teamwork: number;
}

const INITIAL_SCORES: UserScores = {
    action: 50,
    communication: 50,
    management: 50,
    environment: 50,
    feedback: 50,
    teamwork: 50,
};

export function calculateScores(selectedOptions: QuestionOption[]): UserScores {
    const scores = { ...INITIAL_SCORES };

    selectedOptions.forEach((option) => {
        Object.entries(option.scores).forEach(([key, value]) => {
            const dimension = key as Dimension;
            const weight = 0.4;
            scores[dimension] = scores[dimension] * (1 - weight) + value * weight;
        });
    });

    return scores;
}

export interface MatchResult {
    bossId: string;
    matchScore: number;
    growthScore: number;
    stabilityScore: number;
    challengeScore: number;
    synergyPoints: string[];
    reason: string;
    detailedAnalysis: string;
}

export function findBestMatch(userScores: UserScores): MatchResult {
    let bestMatch: MatchResult | null = null;
    let highestScore = -1;

    BOSS_PROFILES.forEach((boss) => {
        // Advanced weighted scoring with similarity/complementarity logic
        let weightedScore = 0;
        let totalWeight = 0;

        Object.keys(userScores).forEach((key) => {
            const dim = key as Dimension;
            const dimWeight = DIMENSION_WEIGHTS[dim];
            const userValue = userScores[dim];
            const bossValue = boss.scores[dim];
            const diff = Math.abs(userValue - bossValue);

            // If similarity is preferred, lower diff is better
            // If complementarity is acceptable, moderate diff is okay
            let dimensionScore: number;
            if (dimWeight.similarity) {
                // Similarity: score decreases with difference
                dimensionScore = Math.max(0, 100 - diff);
            } else {
                // Complementarity: moderate differences are acceptable
                // Too similar or too different both get lower scores
                const idealDiff = 30; // Some difference is good for complementarity
                const diffFromIdeal = Math.abs(diff - idealDiff);
                dimensionScore = Math.max(0, 100 - diffFromIdeal);
            }

            weightedScore += dimensionScore * dimWeight.weight;
            totalWeight += dimWeight.weight;
        });

        const matchScore = Math.round(weightedScore / totalWeight);

        // Calculate additional scores
        const growthScore = calculateGrowthScore(userScores, boss.scores);
        const stabilityScore = calculateStabilityScore(userScores, boss.scores);
        const challengeScore = calculateChallengeScore(userScores, boss.scores);

        if (matchScore > highestScore) {
            highestScore = matchScore;

            const reason = generateReason(userScores, boss);
            const detailedAnalysis = generateDetailedAnalysis(userScores, boss);

            bestMatch = {
                bossId: boss.id,
                matchScore,
                growthScore,
                stabilityScore,
                challengeScore,
                synergyPoints: boss.tags,
                reason,
                detailedAnalysis,
            };
        }
    });

    return bestMatch!;
}

function calculateGrowthScore(userScores: UserScores, bossScores: UserScores): number {
    // Growth is higher when boss challenges you in your weak areas
    const userWeakDimensions = Object.entries(userScores)
        .filter(([_, score]) => score < 50)
        .map(([dim]) => dim as Dimension);

    let growthPotential = 0;
    userWeakDimensions.forEach((dim) => {
        if (bossScores[dim] > 70) {
            growthPotential += (bossScores[dim] - userScores[dim]) / 2;
        }
    });

    // Also consider boss's management style (ハンズオン = higher growth support)
    growthPotential += bossScores.management * 0.3;

    return Math.min(100, Math.round(growthPotential + 50));
}

function calculateStabilityScore(userScores: UserScores, bossScores: UserScores): number {
    // Stability is higher when communication and teamwork align well
    const commDiff = Math.abs(userScores.communication - bossScores.communication);
    const teamDiff = Math.abs(userScores.teamwork - bossScores.teamwork);
    const envDiff = Math.abs(userScores.environment - bossScores.environment);

    const avgDiff = (commDiff + teamDiff + envDiff) / 3;
    const stabilityBase = Math.max(0, 100 - avgDiff);

    // Boss's teamwork score also contributes to stability
    return Math.round(stabilityBase * 0.7 + bossScores.teamwork * 0.3);
}

function calculateChallengeScore(userScores: UserScores, bossScores: UserScores): number {
    // Challenge is higher when boss pushes for speed and innovation
    let challengeLevel = bossScores.action * 0.4;
    challengeLevel += bossScores.environment * 0.4;

    // Lower management (more autonomy) = higher challenge
    challengeLevel += (100 - bossScores.management) * 0.2;

    return Math.min(100, Math.round(challengeLevel));
}

function generateReason(userScores: UserScores, boss: typeof BOSS_PROFILES[0]): string {
    let bestDim: Dimension = 'action';
    let minDiff = 100;

    Object.keys(userScores).forEach((key) => {
        const dim = key as Dimension;
        const diff = Math.abs(userScores[dim] - boss.scores[dim]);
        if (diff < minDiff) {
            minDiff = diff;
            bestDim = dim;
        }
    });

    const templates = minDiff < 20 ? MATCHING_TEMPLATES.high_synergy :
        minDiff < 40 ? MATCHING_TEMPLATES.supportive :
            MATCHING_TEMPLATES.complementary;
    const template = templates[Math.floor(Math.random() * templates.length)];

    const getUserStrength = (dim: Dimension, score: number) => {
        return score > 50 ? DIMENSIONS[dim].maxLabel : DIMENSIONS[dim].minLabel;
    };

    const getBossStrength = (dim: Dimension, score: number) => {
        return score > 50 ? DIMENSIONS[dim].maxLabel : DIMENSIONS[dim].minLabel;
    };

    return template
        .replace(/{user_strength}/g, getUserStrength(bestDim, userScores[bestDim]))
        .replace(/{boss_strength}/g, getBossStrength(bestDim, boss.scores[bestDim]))
        .replace(/{boss_name}/g, boss.name);
}

function generateDetailedAnalysis(userScores: UserScores, boss: typeof BOSS_PROFILES[0]): string {
    const analyses: string[] = [];

    // Find strongest matches
    const strongMatches = Object.entries(userScores)
        .map(([dim, score]) => ({
            dim: dim as Dimension,
            diff: Math.abs(score - boss.scores[dim as Dimension])
        }))
        .filter(({ diff }) => diff < 25)
        .sort((a, b) => a.diff - b.diff)
        .slice(0, 2);

    if (strongMatches.length > 0) {
        const dimLabels = strongMatches.map(m => DIMENSIONS[m.dim].label).join('・');
        analyses.push(`${dimLabels}の相性が特に良好です。`);
    }

    // Check for growth opportunities
    const growthAreas = Object.entries(userScores)
        .filter(([dim, score]) => score < 50 && boss.scores[dim as Dimension] > 70)
        .map(([dim]) => DIMENSIONS[dim as Dimension].label);

    if (growthAreas.length > 0) {
        analyses.push(`${growthAreas.join('・')}の面で大きな成長が期待できます。`);
    }

    // Add boss philosophy
    analyses.push(boss.managementPhilosophy);

    return analyses.join(' ');
}
