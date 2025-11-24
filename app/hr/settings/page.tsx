"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Moon, Shield, LogOut, ChevronRight, Mail, Lock, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        <NavButton
                            active={activeTab === "profile"}
                            onClick={() => setActiveTab("profile")}
                            icon={<User className="w-4 h-4" />}
                            label="Profile"
                        />
                        <NavButton
                            active={activeTab === "notifications"}
                            onClick={() => setActiveTab("notifications")}
                            icon={<Bell className="w-4 h-4" />}
                            label="Notifications"
                        />
                        <NavButton
                            active={activeTab === "appearance"}
                            onClick={() => setActiveTab("appearance")}
                            icon={<Moon className="w-4 h-4" />}
                            label="Appearance"
                        />
                        <NavButton
                            active={activeTab === "security"}
                            onClick={() => setActiveTab("security")}
                            icon={<Shield className="w-4 h-4" />}
                            label="Security"
                        />
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-8"
                    >
                        {activeTab === "profile" && <ProfileSettings />}
                        {activeTab === "notifications" && <NotificationSettings />}
                        {activeTab === "appearance" && <AppearanceSettings />}
                        {activeTab === "security" && <SecuritySettings />}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${active
                    ? "bg-primary text-white shadow-[0_0_15px_-3px_var(--color-primary)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
        >
            {icon}
            {label}
            {active && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
        </button>
    );
}

function ProfileSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Profile Information</h2>
                <p className="text-sm text-muted-foreground">Update your personal details and public profile.</p>
            </div>
            <Separator className="bg-white/10" />

            <div className="flex items-center gap-6">
                <div className="relative">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                        alt="Avatar"
                        className="w-24 h-24 rounded-full border-4 border-white/10 bg-white/5"
                    />
                    <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors shadow-lg">
                        <User className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Admin User</h3>
                    <p className="text-muted-foreground">HR Manager</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <Input id="firstName" defaultValue="Admin" className="bg-black/20 border-white/10 text-white focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <Input id="lastName" defaultValue="User" className="bg-black/20 border-white/10 text-white focus:border-primary" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input id="email" defaultValue="admin@company.com" className="pl-10 bg-black/20 border-white/10 text-white focus:border-primary" />
                    </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio" className="text-white">Bio</Label>
                    <textarea
                        id="bio"
                        className="w-full min-h-[100px] rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground"
                        placeholder="Tell us about yourself..."
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="ghost" className="text-white hover:bg-white/10">Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
            </div>
        </div>
    );
}

function NotificationSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Notifications</h2>
                <p className="text-sm text-muted-foreground">Configure how you receive alerts and updates.</p>
            </div>
            <Separator className="bg-white/10" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive daily summaries and important alerts.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">New Candidate Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when new candidates enter the waiting room.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">Match Completion</Label>
                        <p className="text-sm text-muted-foreground">Notify when AI completes a placement simulation.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly analysis of team performance.</p>
                    </div>
                    <Switch />
                </div>
            </div>
        </div>
    );
}

function AppearanceSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize the look and feel of the application.</p>
            </div>
            <Separator className="bg-white/10" />

            <div className="space-y-6">
                <div className="space-y-3">
                    <Label className="text-base text-white">Theme</Label>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border-2 border-primary rounded-lg p-1 cursor-pointer">
                            <div className="bg-[#0a0f1e] h-20 rounded-md flex items-center justify-center border border-white/10">
                                <span className="text-white font-medium">Dark</span>
                            </div>
                        </div>
                        <div className="border-2 border-transparent hover:border-white/20 rounded-lg p-1 cursor-pointer opacity-50">
                            <div className="bg-white h-20 rounded-md flex items-center justify-center border border-gray-200">
                                <span className="text-black font-medium">Light</span>
                            </div>
                        </div>
                        <div className="border-2 border-transparent hover:border-white/20 rounded-lg p-1 cursor-pointer opacity-50">
                            <div className="bg-slate-900 h-20 rounded-md flex items-center justify-center border border-white/10">
                                <span className="text-white font-medium">System</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">Reduced Motion</Label>
                        <p className="text-sm text-muted-foreground">Minimize animations for better accessibility.</p>
                    </div>
                    <Switch />
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">Display more content with tighter spacing.</p>
                    </div>
                    <Switch />
                </div>
            </div>
        </div>
    );
}

function SecuritySettings() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-white mb-1">Security</h2>
                <p className="text-sm text-muted-foreground">Manage your password and security preferences.</p>
            </div>
            <Separator className="bg-white/10" />

            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Change Password</h3>
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input id="currentPassword" type="password" className="pl-10 bg-black/20 border-white/10 text-white focus:border-primary" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">New Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input id="newPassword" type="password" className="pl-10 bg-black/20 border-white/10 text-white focus:border-primary" />
                        </div>
                    </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base text-white">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">Enable 2FA</Button>
                </div>

                <Separator className="bg-white/5" />

                <div className="pt-4">
                    <Button variant="destructive" className="w-full sm:w-auto">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out of all devices
                    </Button>
                </div>
            </div>
        </div>
    );
}
