import { Users, Zap, Shield, Target, Lightbulb, Rocket } from "lucide-react";

export type Trait = {
    id: string;
    label: string;
    color: string; // Tailwind class for badge
};

export type Person = {
    id: string;
    name: string;
    role: string;
    avatar: string; // URL or placeholder ID
    traits: Trait[];
    stressLevel: number; // 0-100
    performance: number; // 0-100
};

export type Team = {
    id: string;
    name: string;
    description: string;
    leader: Person;
    members: Person[];
    metrics: {
        psychologicalSafety: number; // 0-100
        productivity: number; // 0-100
        innovation: number; // 0-100
    };
    themeColor: string; // Hex or Tailwind class
};

export type Candidate = Person & {
    status: "pending" | "assigned";
    assignedTeamId?: string;
    matchScores: Record<string, number>; // teamId -> score (0-100)
};

// --- Mock Data ---

const TRAITS: Record<string, Trait> = {
    LEADERSHIP: { id: "t1", label: "リーダーシップ", color: "bg-blue-500/20 text-blue-300" },
    CREATIVE: { id: "t2", label: "独創性", color: "bg-purple-500/20 text-purple-300" },
    ANALYTICAL: { id: "t3", label: "分析思考", color: "bg-indigo-500/20 text-indigo-300" },
    SUPPORTIVE: { id: "t4", label: "協調性", color: "bg-green-500/20 text-green-300" },
    AMBITIOUS: { id: "t5", label: "野心家", color: "bg-red-500/20 text-red-300" },
    DILIGENT: { id: "t6", label: "誠実", color: "bg-slate-500/20 text-slate-300" },
};

export const MOCK_TEAMS: Team[] = [
    {
        id: "team-alpha",
        name: "Alpha Squad",
        description: "新規事業開発・イノベーション特化チーム",
        themeColor: "from-blue-600 to-cyan-500",
        metrics: { psychologicalSafety: 85, productivity: 92, innovation: 95 },
        leader: {
            id: "l1",
            name: "神宮寺 健",
            role: "Product Owner",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ken",
            traits: [TRAITS.LEADERSHIP, TRAITS.AMBITIOUS, TRAITS.CREATIVE],
            stressLevel: 45,
            performance: 98,
        },
        members: [
            { id: "m1", name: "佐藤 浩二", role: "Frontend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koji", traits: [TRAITS.CREATIVE, TRAITS.DILIGENT], stressLevel: 30, performance: 88 },
            { id: "m2", name: "鈴木 愛", role: "Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ai", traits: [TRAITS.CREATIVE, TRAITS.SUPPORTIVE], stressLevel: 25, performance: 90 },
            { id: "m3", name: "高橋 翔", role: "Backend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sho", traits: [TRAITS.ANALYTICAL, TRAITS.DILIGENT], stressLevel: 40, performance: 92 },
            { id: "m4", name: "田中 美咲", role: "Marketer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Misaki", traits: [TRAITS.AMBITIOUS, TRAITS.SUPPORTIVE], stressLevel: 50, performance: 85 },
            { id: "m5", name: "伊藤 健太", role: "Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta", traits: [TRAITS.ANALYTICAL], stressLevel: 35, performance: 80 },
        ],
    },
    {
        id: "team-beta",
        name: "Beta Force",
        description: "基幹システム・安定運用チーム",
        themeColor: "from-emerald-600 to-teal-500",
        metrics: { psychologicalSafety: 92, productivity: 88, innovation: 60 },
        leader: {
            id: "l2",
            name: "堂本 剛",
            role: "Tech Lead",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tsuyoshi",
            traits: [TRAITS.SUPPORTIVE, TRAITS.ANALYTICAL, TRAITS.DILIGENT],
            stressLevel: 20,
            performance: 95,
        },
        members: [
            { id: "m6", name: "渡辺 裕子", role: "SRE", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuko", traits: [TRAITS.DILIGENT, TRAITS.ANALYTICAL], stressLevel: 15, performance: 94 },
            { id: "m7", name: "小林 大輔", role: "Backend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisuke", traits: [TRAITS.DILIGENT, TRAITS.SUPPORTIVE], stressLevel: 20, performance: 89 },
            { id: "m8", name: "加藤 舞", role: "QA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai", traits: [TRAITS.ANALYTICAL, TRAITS.DILIGENT], stressLevel: 10, performance: 92 },
            { id: "m9", name: "吉田 拓也", role: "Infra", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takuya", traits: [TRAITS.ANALYTICAL], stressLevel: 25, performance: 88 },
            { id: "m10", name: "佐々木 玲奈", role: "Support", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rena", traits: [TRAITS.SUPPORTIVE], stressLevel: 15, performance: 90 },
        ],
    },
    {
        id: "team-gamma",
        name: "Gamma Sales",
        description: "法人営業・クライアントサクセス",
        themeColor: "from-orange-600 to-amber-500",
        metrics: { psychologicalSafety: 75, productivity: 96, innovation: 70 },
        leader: {
            id: "l3",
            name: "松本 潤",
            role: "Sales Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jun",
            traits: [TRAITS.AMBITIOUS, TRAITS.LEADERSHIP, TRAITS.SUPPORTIVE],
            stressLevel: 60,
            performance: 99,
        },
        members: [
            { id: "m11", name: "井上 真央", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mao", traits: [TRAITS.AMBITIOUS, TRAITS.SUPPORTIVE], stressLevel: 55, performance: 95 },
            { id: "m12", name: "木村 拓哉", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TakuyaK", traits: [TRAITS.AMBITIOUS, TRAITS.LEADERSHIP], stressLevel: 65, performance: 98 },
            { id: "m13", name: "工藤 静香", role: "CS", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shizuka", traits: [TRAITS.SUPPORTIVE, TRAITS.DILIGENT], stressLevel: 40, performance: 92 },
            { id: "m14", name: "長瀬 智也", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tomoya", traits: [TRAITS.AMBITIOUS, TRAITS.CREATIVE], stressLevel: 50, performance: 90 },
            { id: "m15", name: "岡田 准一", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Junichi", traits: [TRAITS.DILIGENT, TRAITS.AMBITIOUS], stressLevel: 45, performance: 93 },
        ],
    },
];

export const MOCK_CANDIDATES: Candidate[] = [
    {
        id: "c1",
        name: "新垣 結衣",
        role: "Creative Director",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yui",
        traits: [TRAITS.CREATIVE, TRAITS.AMBITIOUS, TRAITS.LEADERSHIP],
        stressLevel: 0,
        performance: 0,
        status: "pending",
        matchScores: { "team-alpha": 96, "team-beta": 65, "team-gamma": 78 },
    },
    {
        id: "c2",
        name: "星野 源",
        role: "Senior Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gen",
        traits: [TRAITS.ANALYTICAL, TRAITS.DILIGENT, TRAITS.SUPPORTIVE],
        stressLevel: 0,
        performance: 0,
        status: "pending",
        matchScores: { "team-alpha": 72, "team-beta": 94, "team-gamma": 60 },
    },
    {
        id: "c3",
        name: "堺 雅人",
        role: "Sales Executive",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Masato",
        traits: [TRAITS.AMBITIOUS, TRAITS.LEADERSHIP, TRAITS.ANALYTICAL],
        stressLevel: 0,
        performance: 0,
        status: "pending",
        matchScores: { "team-alpha": 82, "team-beta": 55, "team-gamma": 98 },
    },
];
