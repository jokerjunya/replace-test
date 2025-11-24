export type Dimension = 'action' | 'communication' | 'management' | 'environment' | 'feedback' | 'teamwork';

export interface QuestionOption {
    text: string;
    scores: Partial<Record<Dimension, number>>;
}

export interface Question {
    id: number;
    text: string;
    options: QuestionOption[];
}

export interface EmployeeReview {
    employeeName: string;
    role: string;
    tenure: string;
    rating: number; // 1-5
    comment: string;
}

export interface BossStats {
    averageTenure: string;
    promotionRate: string;
    satisfactionScore: number; // 0-100
    teamSize: number;
}

export interface BossProfile {
    id: string;
    name: string;
    role: string;
    department: string;
    imageColor: string;
    tags: string[];
    scores: Record<Dimension, number>;
    catchphrase: string;
    managementPhilosophy: string;
    reviews: EmployeeReview[];
    stats: BossStats;
}

export const DIMENSIONS: Record<Dimension, { label: string; minLabel: string; maxLabel: string }> = {
    action: { label: '行動スタイル', minLabel: '慎重・計画', maxLabel: '即断・即決' },
    communication: { label: 'コミュニケーション', minLabel: '論理・ファクト', maxLabel: '共感・情緒' },
    management: { label: 'マネジメント', minLabel: '権限委譲', maxLabel: 'ハンズオン' },
    environment: { label: '環境適性', minLabel: '安定・秩序', maxLabel: '変化・革新' },
    feedback: { label: '評価基準', minLabel: '結果重視', maxLabel: 'プロセス重視' },
    teamwork: { label: 'チームワーク', minLabel: '個の力', maxLabel: 'チームの和' },
};

// Dimension weights: true = similarity is better, false = complementarity is acceptable
export const DIMENSION_WEIGHTS: Record<Dimension, { similarity: boolean; weight: number }> = {
    communication: { similarity: true, weight: 1.5 },  // コミュニケーションスタイルは似ている方が良い
    teamwork: { similarity: true, weight: 1.3 },       // チームワークも類似性重視
    action: { similarity: true, weight: 1.2 },         // 行動ペースも合う方が良い
    environment: { similarity: true, weight: 1.1 },    // 環境の好みも類似性
    management: { similarity: false, weight: 1.0 },    // マネジメントは相補性もOK
    feedback: { similarity: false, weight: 1.0 },      // 評価基準も相補性もあり
};

export const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "新しいプロジェクトが始まったとき、まず何をする？",
        options: [
            { text: "リスクを洗い出し、詳細な計画を立てる", scores: { action: 20, environment: 20 } },
            { text: "まずは走り出し、走りながら考える", scores: { action: 90, environment: 90 } },
            { text: "チームメンバーと話し合い、役割分担を決める", scores: { teamwork: 80, communication: 70 } },
            { text: "成功の定義とゴールを明確にする", scores: { feedback: 20, management: 30 } },
        ],
    },
    {
        id: 2,
        text: "ミスをしてしまったとき、上司にどう対応してほしい？",
        options: [
            { text: "なぜ起きたのか、論理的に原因を分析してほしい", scores: { communication: 20, feedback: 20 } },
            { text: "まずは気持ちに寄り添い、励ましてほしい", scores: { communication: 90, teamwork: 80 } },
            { text: "挽回のチャンスとして、すぐに次の仕事を任せてほしい", scores: { action: 80, management: 20 } },
            { text: "具体的な改善策を一緒に考えてほしい", scores: { management: 80, feedback: 80 } },
        ],
    },
    {
        id: 3,
        text: "仕事のモチベーションが最も上がる瞬間は？",
        options: [
            { text: "誰も思いつかなかった新しいアイデアが閃いたとき", scores: { environment: 90, action: 80 } },
            { text: "チーム全員で困難な目標を達成したとき", scores: { teamwork: 90, communication: 80 } },
            { text: "自分のスキルアップや成長を実感できたとき", scores: { management: 20, feedback: 80 } },
            { text: "目に見える成果が出て、周囲に認められたとき", scores: { feedback: 20, action: 60 } },
        ],
    },
    {
        id: 4,
        text: "理想のチームの雰囲気は？",
        options: [
            { text: "静かで集中でき、各々がプロとして自律している", scores: { teamwork: 20, communication: 30 } },
            { text: "ワイワイと活気があり、常に誰かが話している", scores: { teamwork: 90, communication: 90 } },
            { text: "規律があり、整理整頓されている", scores: { environment: 20, management: 70 } },
            { text: "常に変化があり、刺激的で飽きない", scores: { environment: 90, action: 80 } },
        ],
    },
    {
        id: 5,
        text: "上司への報告・連絡・相談、あなたのスタイルは？",
        options: [
            { text: "必要なことだけを簡潔に、結論から伝える", scores: { communication: 20, action: 60 } },
            { text: "プロセスや感情も含めて、こまめに共有する", scores: { communication: 90, management: 80 } },
            { text: "問題が起きたときだけ相談し、基本は任せてほしい", scores: { management: 20, action: 70 } },
            { text: "定例ミーティングでまとめて報告する", scores: { environment: 30, management: 50 } },
        ],
    },
    {
        id: 6,
        text: "プレッシャーがかかる状況で、あなたはどう感じる？",
        options: [
            { text: "燃える。本領を発揮できる", scores: { action: 90, environment: 85 } },
            { text: "不安だが、準備をすれば対応できる", scores: { action: 30, feedback: 70 } },
            { text: "チームで乗り越えたい", scores: { teamwork: 90, communication: 85 } },
            { text: "できれば避けたい", scores: { environment: 20, teamwork: 60 } },
        ],
    },
    {
        id: 7,
        text: "仕事で最も大切にしている価値観は？",
        options: [
            { text: "革新と創造性", scores: { environment: 95, action: 80 } },
            { text: "効率と生産性", scores: { action: 70, feedback: 30 } },
            { text: "人間関係と信頼", scores: { teamwork: 95, communication: 90 } },
            { text: "成長と学び", scores: { feedback: 85, management: 40 } },
        ],
    },
    {
        id: 8,
        text: "意見が対立したとき、あなたは？",
        options: [
            { text: "データや論理で説得する", scores: { communication: 20, feedback: 30 } },
            { text: "相手の立場を理解しようとする", scores: { communication: 90, teamwork: 85 } },
            { text: "第三者の意見を求める", scores: { teamwork: 70, management: 60 } },
            { text: "自分の信念を貫く", scores: { action: 85, management: 25 } },
        ],
    },
    {
        id: 9,
        text: "学習や成長において、あなたに合うスタイルは？",
        options: [
            { text: "体系的な研修やセミナー", scores: { environment: 25, feedback: 75 } },
            { text: "実践を通じた試行錯誤", scores: { action: 90, environment: 80 } },
            { text: "メンターからの1on1指導", scores: { management: 85, communication: 75 } },
            { text: "同僚との議論や協働", scores: { teamwork: 90, communication: 85 } },
        ],
    },
    {
        id: 10,
        text: "キャリアにおいて、今最も求めているものは？",
        options: [
            { text: "安定した環境での着実な成長", scores: { environment: 20, feedback: 70 } },
            { text: "大きな裁量と挑戦の機会", scores: { management: 15, action: 90 } },
            { text: "優れたチームとの協働経験", scores: { teamwork: 95, communication: 85 } },
            { text: "明確なキャリアパスと昇進", scores: { feedback: 25, management: 60 } },
        ],
    },
];

export const BOSS_PROFILES: BossProfile[] = [
    {
        id: 'b1',
        name: "佐藤 優子",
        role: "プロダクト開発部 部長",
        department: "Product Development",
        imageColor: "from-blue-500 to-cyan-400",
        tags: ["ビジョナリー", "任せる力", "スピード重視"],
        catchphrase: "失敗を恐れず、まずはやってみよう。",
        managementPhilosophy: "メンバーの自律性を最大限尊重し、大きな裁量を与えることで、個々の創造性とオーナーシップを引き出します。",
        scores: {
            action: 90,
            communication: 60,
            management: 30,
            environment: 90,
            feedback: 40,
            teamwork: 70,
        },
        reviews: [
            {
                employeeName: "山田 太郎",
                role: "プロダクトマネージャー",
                tenure: "3年",
                rating: 5,
                comment: "佐藤部長のもとで、自分の可能性を最大限引き出せました。失敗を恐れず挑戦できる環境が素晴らしいです。"
            },
            {
                employeeName: "鈴木 花子",
                role: "エンジニアリードー",
                tenure: "2年",
                rating: 4,
                comment: "スピード感があり、意思決定が早い。ただし細かいサポートは少ないので、自走力が求められます。"
            },
            {
                employeeName: "田中 次郎",
                role: "デザイナー",
                tenure: "4年",
                rating: 5,
                comment: "「とにかくやってみよう」の精神で、新しいアイデアをすぐに試せる。成長スピードが圧倒的に速いです。"
            }
        ],
        stats: {
            averageTenure: "3.2年",
            promotionRate: "65%",
            satisfactionScore: 92,
            teamSize: 15
        }
    },
    {
        id: 'b2',
        name: "田中 健一",
        role: "営業統括本部 本部長",
        department: "Sales Division",
        imageColor: "from-red-500 to-orange-400",
        tags: ["熱血", "チームワーク", "面倒見が良い"],
        catchphrase: "一人で悩むな、チームで勝つぞ。",
        managementPhilosophy: "チーム全員が家族のように支え合い、一丸となって目標を達成する。個人の成功よりもチームの勝利を優先します。",
        scores: {
            action: 70,
            communication: 90,
            management: 80,
            environment: 60,
            feedback: 70,
            teamwork: 95,
        },
        reviews: [
            {
                employeeName: "佐々木 美咲",
                role: "営業マネージャー",
                tenure: "5年",
                rating: 5,
                comment: "田中本部長は本当に面倒見が良く、困ったときは必ず助けてくれます。チームの結束力が他部署とは段違いです。"
            },
            {
                employeeName: "高橋 大輔",
                role: "営業",
                tenure: "1年",
                rating: 4,
                comment: "熱い方です。毎日のように励まされ、チームで目標を追いかける楽しさを知りました。ただし個人行動は好まれません。"
            },
            {
                employeeName: "伊藤 真理子",
                role: "営業リーダー",
                tenure: "6年",
                rating: 5,
                comment: "人として尊敬できる上司。部下の悩みに真剣に向き合い、一緒に涙を流してくれることさえあります。"
            }
        ],
        stats: {
            averageTenure: "4.8年",
            promotionRate: "58%",
            satisfactionScore: 95,
            teamSize: 28
        }
    },
    {
        id: 'b3',
        name: "鈴木 誠",
        role: "経営企画室 室長",
        department: "Corporate Planning",
        imageColor: "from-indigo-500 to-purple-400",
        tags: ["論理的", "冷静沈着", "公平性"],
        catchphrase: "数字は嘘をつかない。事実に基づこう。",
        managementPhilosophy: "感情に流されず、常にデータとロジックに基づいた意思決定を行う。公平な評価と透明性を何よりも重視します。",
        scores: {
            action: 40,
            communication: 20,
            management: 50,
            environment: 30,
            feedback: 20,
            teamwork: 40,
        },
        reviews: [
            {
                employeeName: "小林 健太",
                role: "経営企画",
                tenure: "2年",
                rating: 4,
                comment: "鈴木室長は非常に論理的で、曖昧さを一切許しません。厳しいですが、公平で筋が通っています。"
            },
            {
                employeeName: "中村 さくら",
                role: "データアナリスト",
                tenure: "3年",
                rating: 4,
                comment: "感情的なやり取りが苦手な方ですが、データに基づいた議論は非常に建設的。成長できる環境です。"
            },
            {
                employeeName: "渡辺 翔太",
                role: "戦略プランナー",
                tenure: "4年",
                rating: 3,
                comment: "優秀な方ですが、少し冷たく感じることも。ロジカルシンキングが得意な人には最適な上司だと思います。"
            }
        ],
        stats: {
            averageTenure: "3.5年",
            promotionRate: "72%",
            satisfactionScore: 78,
            teamSize: 12
        }
    },
    {
        id: 'b4',
        name: "高橋 エリカ",
        role: "クリエイティブディレクター",
        department: "Design Division",
        imageColor: "from-pink-500 to-rose-400",
        tags: ["革新的", "自由", "感性重視"],
        catchphrase: "常識を疑え。もっと自由に。",
        managementPhilosophy: "既成概念にとらわれず、メンバーの独創性と感性を最大限尊重。自由な発想から革新が生まれると信じています。",
        scores: {
            action: 80,
            communication: 80,
            management: 10,
            environment: 95,
            feedback: 80,
            teamwork: 60,
        },
        reviews: [
            {
                employeeName: "松本 あかり",
                role: "UIデザイナー",
                tenure: "2年",
                rating: 5,
                comment: "高橋さんのもとでは、自分のクリエイティビティが爆発しました。型にはまらない自由な環境が最高です。"
            },
            {
                employeeName: "吉田 拓海",
                role: "アートディレクター",
                tenure: "1年",
                rating: 4,
                comment: "刺激的で毎日が新鮮。ただし、ルールや体系が少ないので、自己管理能力が必須です。"
            },
            {
                employeeName: "森田 琴音",
                role: "グラフィックデザイナー",
                tenure: "3年",
                rating: 5,
                comment: "常識を疑え、と言われ続けて3年。今では自分が思いもよらないアイデアを出せるようになりました。"
            }
        ],
        stats: {
            averageTenure: "2.8年",
            promotionRate: "45%",
            satisfactionScore: 88,
            teamSize: 18
        }
    },
];

export const MATCHING_TEMPLATES = {
    high_synergy: [
        "あなたの「{user_strength}」な姿勢は、{boss_name}の「{boss_strength}」というスタイルと非常に高い相乗効果を生み出します。お互いの強みが増幅され、爆発的な成果を生み出せるペアです。",
        "{boss_name}は、あなたの「{user_strength}」という特性を誰よりも高く評価し、最大限に活かすことができるリーダーです。あなたの才能が、このチームの起爆剤となるでしょう。",
    ],
    complementary: [
        "あなたの「{user_strength}」という特徴は、{boss_name}のスタイルを完璧に補完します。{boss_name}が全体像を描き、あなたがそれを着実に実行する、そんな理想的な役割分担が期待できます。",
        "自分にない視点を持つ二人だからこそ、死角がなくなります。あなたの「{user_strength}」は、{boss_name}にとって喉から手が出るほど欲しい能力です。",
    ],
    supportive: [
        "{boss_name}の「{boss_strength}」というスタンスは、あなたの成長を強力に後押しします。あなたが安心して「{user_strength}」を発揮できる環境が、ここにはあります。",
        "心理的安全性が非常に高いマッチングです。{boss_name}のもとであれば、あなたは失敗を恐れずに、本来の「{user_strength}」をのびのびと発揮できるでしょう。",
    ],
};
