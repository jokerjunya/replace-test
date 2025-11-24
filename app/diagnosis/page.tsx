"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { QUESTIONS, QuestionOption } from "@/app/lib/constants";
import { calculateScores } from "@/app/lib/logic";

export default function DiagnosisPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const router = useRouter();

    const handleAnswer = (option: QuestionOption) => {
        const newSelectedOptions = [...selectedOptions, option];
        setSelectedOptions(newSelectedOptions);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setIsAnalyzing(true);
            // Calculate scores and save to session storage
            const scores = calculateScores(newSelectedOptions);
            sessionStorage.setItem('userScores', JSON.stringify(scores));

            setTimeout(() => {
                router.push("/offer");
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />

            <div className="w-full max-w-2xl relative z-10">
                <AnimatePresence mode="wait">
                    {isAnalyzing ? (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-6"
                        >
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                            </div>
                            <h2 className="text-3xl font-bold">ワークスタイルを分析中...</h2>
                            <p className="text-muted-foreground text-lg">
                                あなたの強みを引き出す、最高の上司を探しています。
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={QUESTIONS[currentQuestion].id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-8 flex justify-between items-center text-sm text-muted-foreground">
                                <span>質問 {currentQuestion + 1} / {QUESTIONS.length}</span>
                                <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
                                        animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <Card className="border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                                <CardContent className="p-8 space-y-8">
                                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                                        {QUESTIONS[currentQuestion].text}
                                    </h2>

                                    <div className="grid gap-4">
                                        {QUESTIONS[currentQuestion].options.map((option, index) => (
                                            <motion.button
                                                key={index}
                                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleAnswer(option)}
                                                className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-colors flex items-center justify-between group"
                                            >
                                                <span className="text-lg">{option.text}</span>
                                                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all text-primary" />
                                            </motion.button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
