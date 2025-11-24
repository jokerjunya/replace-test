"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-primary-foreground/80 mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span>AIによる上司マッチング</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            会社ではなく、<br />
            <span className="text-primary">上司で選ぼう。</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            「配属ガチャ」を終わらせよう。<br />
            入社前にあなたに最適な上司とマッチングし、<br className="hidden md:block" />
            心理的安全性とパフォーマンスを保証します。
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link href="/diagnosis">
              <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_-5px_var(--color-primary)] transition-all hover:scale-105">
                最高の上司を見つける
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/hr">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-white/20 hover:bg-white/10 text-white backdrop-blur-sm transition-all">
                採用担当の方へ
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Features */}
        <div className="absolute bottom-10 w-full max-w-6xl mx-auto px-4 hidden md:flex justify-between text-left opacity-60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-white">チームの相性</p>
              <p className="text-sm text-muted-foreground">AIによる適合性分析</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-white">心理的安全性</p>
              <p className="text-sm text-muted-foreground">入社初日から保証</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
