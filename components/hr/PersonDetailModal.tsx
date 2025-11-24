"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Person } from "@/lib/mockData";
import { X, GraduationCap, Briefcase, Award, MessageSquare, DollarSign, Calendar, Heart, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PersonDetailModalProps {
    person: Person | null;
    isOpen: boolean;
    onClose: () => void;
}

type Tab = "resume" | "interview" | "preferences";

export function PersonDetailModal({ person, isOpen, onClose }: PersonDetailModalProps) {
    const [activeTab, setActiveTab] = useState<Tab>("resume");

    if (!person) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#0f172a] border border-white/10 w-full max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                                <div className="flex gap-5">
                                    <img
                                        src={person.avatar}
                                        alt={person.name}
                                        className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{person.name}</h2>
                                        <p className="text-muted-foreground">{person.role}</p>
                                        <div className="flex gap-2 mt-3">
                                            {person.traits.map((trait) => (
                                                <Badge key={trait.id} className={`${trait.color} border-0`}>
                                                    {trait.label}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-white/10 px-6">
                                <TabButton
                                    active={activeTab === "resume"}
                                    onClick={() => setActiveTab("resume")}
                                    icon={<User className="w-4 h-4" />}
                                    label="Resume & Skills"
                                />
                                <TabButton
                                    active={activeTab === "interview"}
                                    onClick={() => setActiveTab("interview")}
                                    icon={<MessageSquare className="w-4 h-4" />}
                                    label="Interview Logs"
                                />
                                <TabButton
                                    active={activeTab === "preferences"}
                                    onClick={() => setActiveTab("preferences")}
                                    icon={<Heart className="w-4 h-4" />}
                                    label="Preferences"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-hidden bg-black/20">
                                <ScrollArea className="h-full">
                                    <div className="p-8">
                                        {activeTab === "resume" && <ResumeTab person={person} />}
                                        {activeTab === "interview" && <InterviewTab person={person} />}
                                        {activeTab === "preferences" && <PreferencesTab person={person} />}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${active ? "text-white" : "text-muted-foreground hover:text-white/80"
                }`}
        >
            {icon}
            {label}
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
            )}
        </button>
    );
}

function ResumeTab({ person }: { person: Person }) {
    if (!person.details) return <div className="text-muted-foreground">No detailed information available.</div>;
    const { resume } = person.details;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
                <Section title="Work History" icon={<Briefcase className="w-5 h-5 text-blue-400" />}>
                    <div className="space-y-6">
                        {resume.workHistory.map((work, i) => (
                            <div key={i} className="relative pl-4 border-l-2 border-white/10">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-blue-500" />
                                <h4 className="font-semibold text-white">{work.role}</h4>
                                <p className="text-sm text-blue-300 mb-1">{work.company}</p>
                                <p className="text-xs text-muted-foreground mb-2">{work.period}</p>
                                <p className="text-sm text-gray-400 leading-relaxed">{work.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Education" icon={<GraduationCap className="w-5 h-5 text-purple-400" />}>
                    <div className="space-y-4">
                        {resume.education.map((edu, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5">
                                <h4 className="font-semibold text-white">{edu.school}</h4>
                                <p className="text-sm text-muted-foreground">{edu.degree}</p>
                                <p className="text-xs text-white/40 mt-1">{edu.year}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>

            <div className="space-y-8">
                <Section title="Skills" icon={<Award className="w-5 h-5 text-emerald-400" />}>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 px-3 py-1">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </Section>

                <Section title="Certifications" icon={<Award className="w-5 h-5 text-amber-400" />}>
                    <ul className="space-y-2">
                        {resume.certifications.map((cert, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                {cert}
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>
        </div>
    );
}

function InterviewTab({ person }: { person: Person }) {
    if (!person.details) return <div className="text-muted-foreground">No interview logs available.</div>;
    const { interview } = person.details;

    if (interview.length === 0) return <div className="text-muted-foreground">No interview logs available.</div>;

    return (
        <div className="space-y-6">
            {interview.map((log, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {log.score}
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{log.interviewer}</h4>
                                <p className="text-xs text-muted-foreground">{log.role} • {log.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, starIndex) => (
                                <div
                                    key={starIndex}
                                    className={`w-2 h-2 rounded-full ${starIndex < log.score ? "bg-primary" : "bg-white/10"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-lg">
                        <p className="text-sm text-gray-300 leading-relaxed italic">"{log.feedback}"</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PreferencesTab({ person }: { person: Person }) {
    if (!person.details) return <div className="text-muted-foreground">No preferences available.</div>;
    const { preferences } = person.details;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardInfo
                icon={<DollarSign className="w-5 h-5 text-green-400" />}
                label="Desired Salary"
                value={preferences.salary}
            />
            <CardInfo
                icon={<Calendar className="w-5 h-5 text-blue-400" />}
                label="Available From"
                value={preferences.startDate}
            />
            <div className="md:col-span-2 bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4 text-purple-400">
                    <Heart className="w-5 h-5" />
                    <h4 className="font-semibold">Motivation</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">{preferences.motivation}</p>
            </div>
            <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Preferred Work Style</h4>
                <div className="flex gap-3">
                    {preferences.workStyle.map((style, i) => (
                        <div key={i} className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-sm text-white">
                            {style}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h3 className="font-bold text-white">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function CardInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="bg-white/5 rounded-xl p-5 border border-white/10 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/5">
                {icon}
            </div>
            <div>
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className="font-bold text-white text-lg">{value}</p>
            </div>
        </div>
    );
}
