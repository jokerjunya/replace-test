"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-muted-foreground">システム全体の設定とパラメータを管理します。</p>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle>Matching Algorithm</CardTitle>
                    <CardDescription>マッチングロジックの重み付けと優先順位を設定します。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Prioritize Psychological Safety</Label>
                            <p className="text-sm text-muted-foreground">
                                心理的安全性を最優先してマッチングを行います。
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Diversity Bonus</Label>
                            <p className="text-sm text-muted-foreground">
                                チームの多様性を高める配置にボーナスポイントを付与します。
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator className="bg-white/10" />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Skill Complementarity</Label>
                            <p className="text-sm text-muted-foreground">
                                スキルの補完関係を重視します（類似性よりも相補性を優先）。
                            </p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>通知とアラートの設定を行います。</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                マッチング完了時にメールで通知を受け取ります。
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="outline" className="border-white/10">Reset to Defaults</Button>
                <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </div>
        </div>
    );
}
