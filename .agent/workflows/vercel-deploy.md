---
description: Vercelにアプリケーションをデプロイする方法
---

# Vercelデプロイワークフロー

このワークフローは、Next.jsアプリケーションをVercelにデプロイする手順を説明します。

## 前提条件

- Vercelアカウントを持っていること
- プロジェクトがGitリポジトリとして管理されていること

## デプロイ手順

### 1. Vercel CLIにログイン（初回のみ）

```bash
npx vercel login
```

ブラウザが開き、認証画面が表示されます。指示に従ってログインしてください。

### 2. アプリケーションをデプロイ

// turbo
```bash
npx vercel --yes
```

このコマンドは以下を自動的に行います:
- プロジェクト設定の検出（Next.js）
- ビルドコマンドの設定
- Vercelプロジェクトへのリンク（初回のみ）
- 本番環境へのデプロイ

### 3. デプロイ結果の確認

デプロイが成功すると、以下の情報が表示されます:
- **Inspect URL**: デプロイ詳細ページ
- **Production URL**: 本番環境のURL

## プロジェクト情報

- **Vercelプロジェクト**: junyas-projects-98f0b06e/replace-test
- **現在の本番URL**: https://replace-test-5s8yajcfn-junyas-projects-98f0b06e.vercel.app

## その他のコマンド

### プレビューデプロイ（テスト用）
```bash
npx vercel
```

### 本番環境に強制デプロイ
```bash
npx vercel --prod
```

### プロジェクト設定の確認
Vercelダッシュボード: https://vercel.com/junyas-projects-98f0b06e/replace-test/settings

## Gitリポジトリとの連携（オプション）

Gitリポジトリと連携すると、プッシュするたびに自動デプロイされます:
https://vercel.link/git
