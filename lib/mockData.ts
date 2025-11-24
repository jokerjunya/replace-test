import { Users, Zap, Shield, Target, Lightbulb, Rocket } from "lucide-react";

export type CandidateDetails = {
    resume: {
        education: { school: string; degree: string; year: string }[];
        workHistory: { company: string; role: string; period: string; description: string }[];
        skills: string[];
        certifications: string[];
    };
    interview: {
        interviewer: string;
        role: string;
        date: string;
        score: number; // 1-5
        feedback: string;
    }[];
    preferences: {
        salary: string;
        startDate: string;
        workStyle: string[]; // e.g. "Remote", "Flex"
        motivation: string;
    };
};

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
    details?: CandidateDetails;
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

const MOCK_DETAILS: CandidateDetails = {
    resume: {
        education: [{ school: "Existing Univ", degree: "Bachelor", year: "2015" }],
        workHistory: [{ company: "Current Corp", role: "Employee", period: "2018-Present", description: "社内での実績多数。" }],
        skills: ["Management", "Communication"],
        certifications: ["Internal Cert"]
    },
    interview: [],
    preferences: {
        salary: "Current",
        startDate: "N/A",
        workStyle: ["Office"],
        motivation: "チームの成長に貢献したい。"
    }
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
            details: MOCK_DETAILS
        },
        members: [
            { id: "m1", name: "佐藤 浩二", role: "Frontend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Koji", traits: [TRAITS.CREATIVE, TRAITS.DILIGENT], stressLevel: 30, performance: 88, details: MOCK_DETAILS },
            { id: "m2", name: "鈴木 愛", role: "Designer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ai", traits: [TRAITS.CREATIVE, TRAITS.SUPPORTIVE], stressLevel: 25, performance: 90, details: MOCK_DETAILS },
            { id: "m3", name: "高橋 翔", role: "Backend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sho", traits: [TRAITS.ANALYTICAL, TRAITS.DILIGENT], stressLevel: 40, performance: 92, details: MOCK_DETAILS },
            { id: "m4", name: "田中 美咲", role: "Marketer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Misaki", traits: [TRAITS.AMBITIOUS, TRAITS.SUPPORTIVE], stressLevel: 50, performance: 85, details: MOCK_DETAILS },
            { id: "m5", name: "伊藤 健太", role: "Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta", traits: [TRAITS.ANALYTICAL], stressLevel: 35, performance: 80, details: MOCK_DETAILS },
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
            details: MOCK_DETAILS
        },
        members: [
            { id: "m6", name: "渡辺 裕子", role: "SRE", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuko", traits: [TRAITS.DILIGENT, TRAITS.ANALYTICAL], stressLevel: 15, performance: 94, details: MOCK_DETAILS },
            { id: "m7", name: "小林 大輔", role: "Backend Dev", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisuke", traits: [TRAITS.DILIGENT, TRAITS.SUPPORTIVE], stressLevel: 20, performance: 89, details: MOCK_DETAILS },
            { id: "m8", name: "加藤 舞", role: "QA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai", traits: [TRAITS.ANALYTICAL, TRAITS.DILIGENT], stressLevel: 10, performance: 92, details: MOCK_DETAILS },
            { id: "m9", name: "吉田 拓也", role: "Infra", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takuya", traits: [TRAITS.ANALYTICAL], stressLevel: 25, performance: 88, details: MOCK_DETAILS },
            { id: "m10", name: "佐々木 玲奈", role: "Support", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rena", traits: [TRAITS.SUPPORTIVE], stressLevel: 15, performance: 90, details: MOCK_DETAILS },
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
            details: MOCK_DETAILS
        },
        members: [
            { id: "m11", name: "井上 真央", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mao", traits: [TRAITS.AMBITIOUS, TRAITS.SUPPORTIVE], stressLevel: 55, performance: 95, details: MOCK_DETAILS },
            { id: "m12", name: "木村 拓哉", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TakuyaK", traits: [TRAITS.AMBITIOUS, TRAITS.LEADERSHIP], stressLevel: 65, performance: 98, details: MOCK_DETAILS },
            { id: "m13", name: "工藤 静香", role: "CS", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shizuka", traits: [TRAITS.SUPPORTIVE, TRAITS.DILIGENT], stressLevel: 40, performance: 92, details: MOCK_DETAILS },
            { id: "m14", name: "長瀬 智也", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tomoya", traits: [TRAITS.AMBITIOUS, TRAITS.CREATIVE], stressLevel: 50, performance: 90, details: MOCK_DETAILS },
            { id: "m15", name: "岡田 准一", role: "Sales", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Junichi", traits: [TRAITS.DILIGENT, TRAITS.AMBITIOUS], stressLevel: 45, performance: 93, details: MOCK_DETAILS },
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
        details: {
            resume: {
                education: [
                    { school: "東京藝術大学", degree: "美術学部 デザイン科", year: "2015" },
                    { school: "Parsons School of Design", degree: "MFA Design", year: "2017" }
                ],
                workHistory: [
                    { company: "Global Tech Inc.", role: "Lead Designer", period: "2020-Present", description: "グローバルブランドのリブランディングを主導。デザインシステム構築により開発生産性を30%向上。" },
                    { company: "Creative Agency X", role: "Art Director", period: "2017-2020", description: "大手飲料メーカーのキャンペーンサイトでカンヌライオンズ受賞。" }
                ],
                skills: ["UI/UX Design", "Brand Strategy", "Team Management", "Figma", "Adobe CC"],
                certifications: ["Google UX Design Certificate", "HCDスペシャリスト"]
            },
            interview: [
                { interviewer: "神宮寺 健", role: "Product Owner", date: "2023-11-15", score: 5, feedback: "圧倒的なポートフォリオと、ビジネス視点を持ったデザイン思考が素晴らしい。即戦力かつリーダー候補。" },
                { interviewer: "人事部長", role: "HR", date: "2023-11-10", score: 4, feedback: "カルチャーフィットに懸念なし。非常に優秀だが、給与条件は高め。" }
            ],
            preferences: {
                salary: "1000万 - 1200万円",
                startDate: "2024年1月以降",
                workStyle: ["Remote OK", "裁量労働制"],
                motivation: "デザインの力で社会課題を解決するプロダクトに携わりたい。"
            }
        }
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
        details: {
            resume: {
                education: [
                    { school: "東京工業大学", degree: "情報理工学院", year: "2014" }
                ],
                workHistory: [
                    { company: "FinTech Startups", role: "Tech Lead", period: "2019-Present", description: "決済基盤のマイクロサービス化をリード。可用性99.99%を達成。" },
                    { company: "Mega Venture", role: "Backend Engineer", period: "2014-2019", description: "大規模トラフィックを捌く広告配信システムの開発に従事。" }
                ],
                skills: ["Go", "Rust", "Kubernetes", "AWS", "System Architecture"],
                certifications: ["AWS Solution Architect Professional", "CKA"]
            },
            interview: [
                { interviewer: "堂本 剛", role: "Tech Lead", date: "2023-11-18", score: 5, feedback: "技術力は申し分ない。特に堅牢なシステム設計への知見が深く、Betaチームの課題解決に直結する。" },
                { interviewer: "CTO", role: "Executive", date: "2023-11-12", score: 4, feedback: "技術への探究心が強い。マネジメントよりはスペシャリスト志向。" }
            ],
            preferences: {
                salary: "900万 - 1100万円",
                startDate: "即日可能",
                workStyle: ["Full Remote", "Flex"],
                motivation: "社会インフラとなるような、大規模かつ堅牢なシステム開発に没頭したい。"
            }
        }
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
        details: {
            resume: {
                education: [
                    { school: "早稲田大学", degree: "政治経済学部", year: "2010" }
                ],
                workHistory: [
                    { company: "Enterprise SaaS Co.", role: "Sales Manager", period: "2018-Present", description: "エンタープライズ営業部門の立ち上げ。年間売上200%成長を3年連続達成。" },
                    { company: "Trading Company", role: "Sales", period: "2010-2018", description: "海外プラント輸出プロジェクトに従事。数億円規模の交渉をまとめる。" }
                ],
                skills: ["Enterprise Sales", "Negotiation", "Team Building", "Salesforce", "English (Business)"],
                certifications: ["MBA (Part-time)", "TOEIC 950"]
            },
            interview: [
                { interviewer: "松本 潤", role: "Sales Manager", date: "2023-11-16", score: 5, feedback: "圧倒的な実績と、論理的かつ情熱的なプレゼン能力。Gammaチームの起爆剤になる。" },
                { interviewer: "CEO", role: "Executive", date: "2023-11-14", score: 5, feedback: "視座が高く、将来の幹部候補として期待できる。" }
            ],
            preferences: {
                salary: "1200万 - 1500万円",
                startDate: "2024年4月",
                workStyle: ["Office Base", "Business Trip OK"],
                motivation: "日本発のSaaSを世界に広めるための、営業組織の強化に挑戦したい。"
            }
        }
    },
];
