"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ArrowRight, RefreshCw, Save } from "lucide-react";

export default function SimulatorPage() {
    const [simulationRunning, setSimulationRunning] = useState(false);

    const runSimulation = () => {
        setSimulationRunning(true);
        setTimeout(() => {
            setSimulationRunning(false);
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Placement Simulator</h1>
                <p className="text-muted-foreground">異なる配置シナリオをシミュレーションし、組織全体への影響を予測します。</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle>Simulation Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Optimization Goal</label>
                                <Select defaultValue="balance">
                                    <SelectTrigger className="bg-white/10 border-white/10">
                                        <SelectValue placeholder="Select goal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="balance">Team Balance</SelectItem>
                                        <SelectItem value="performance">Maximize Performance</SelectItem>
                                        <SelectItem value="safety">Psychological Safety</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Constraint</label>
                                <Select defaultValue="none">
                                    <SelectTrigger className="bg-white/10 border-white/10">
                                        <SelectValue placeholder="Select constraint" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Constraints</SelectItem>
                                        <SelectItem value="budget">Budget Limit</SelectItem>
                                        <SelectItem value="headcount">Headcount Limit</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                className="w-full bg-primary hover:bg-primary/90"
                                onClick={runSimulation}
                                disabled={simulationRunning}
                            >
                                {simulationRunning ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                        Simulating...
                                    </>
                                ) : (
                                    <>
                                        <ArrowRight className="w-4 h-4 mr-2" />
                                        Run Simulation
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle>Predicted Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Avg. Safety</span>
                                    <span className="text-emerald-400 font-bold">+4.2%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Team Balance</span>
                                    <span className="text-emerald-400 font-bold">+12%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Risk Level</span>
                                    <span className="text-amber-400 font-bold">Low</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Simulation Area */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white/5 border-white/10 min-h-[500px] flex items-center justify-center border-dashed">
                        <div className="text-center text-muted-foreground">
                            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Select settings and run simulation to see results</p>
                            <p className="text-sm mt-2 opacity-50">(Interactive drag & drop interface coming soon)</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
