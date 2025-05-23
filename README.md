# Next.js + LangGraph Chatbot Template

このプロジェクトは、Next.js フロントエンドと LangGraph バックエンドを組み合わせたチャットボットアプリケーションです。OpenAI の モデルを活用し、リアルタイムストリーミングレスポンスを実装しています。

主な特徴：

- フロントエンド : Next.js14(App Router), Tailwind , Shadcn UI
- バックエンド : LangGraph
- その他 : SSE（Server-Sent Events）によるストリーミング対応

このテンプレートは、LLM アプリケーションを開発のための基盤として、または学習目的で LangChain と Next.js の統合方法を理解するために使用できます。

## セットアップ

### 環境変数の設定

フロントエンドとバックエンドの両方のディレクトリに `.env.example` ファイルが用意されています。これらのファイルをコピーして `.env` ファイルを作成し、必要な API キーを設定してください。

```bash
# バックエンドの.envファイルを作成
cp backend/.env.example backend/.env

# フロントエンドの.envファイルを作成
cp frontend/.env.example frontend/.env
```

作成した`.env`ファイルに必要な API キーを設定してください。

#### バックエンド (.env)

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx  # OpenAI APIキーを設定してください
```

OpenAI API キーの取得方法については、[OpenAI API Key の取得方法 | 登録時の注意事項も解説](https://book.st-hakky.com/data-science/open-ai-create-api-key/)の記事が非常に詳しいです。この記事では OpenAI アカウントの登録から、支払い情報の設定、API キーの発行までのステップが画像付きで解説されています。

#### フロントエンド (.env)

```
NEXT_PUBLIC_LANGGRAPH_API_URL=http://localhost:2024  # この値はそのままで使用できます
LANGGRAPH_ASSISTANT_ID=chatbot  # このままの値で使用してください
LANGCHAIN_TRACING_V2=true  # このままの値で使用してください
LANGSMITH_PROJECT=my-chatbot-project  # プロジェクト名は任意の値で構いません
LANGSMITH_API_KEY=ls-xxxxxxxxxxxxx  # LangSmith APIキーを設定してください
```

LANGSMITH_PROJECT と LANGSMITH_API_KEY の取得方法については、[LangChain の DevOps プラットフォーム'LangSmith'を使う](https://zenn.dev/nano_sudo/articles/25d96cb6ee1dd3)の記事を参考にしてください。この記事では、LangSmith の API キーの作成方法（サイドバーの「API KEYS」からの作成手順）やプロジェクトの作成方法（トップページの「+ New Project」からの設定手順）が詳しく解説されています。

### インストール

#### バックエンド

```bash
cd backend
npm install
```

#### フロントエンド

```bash
cd frontend
npm install
```

## 実行方法

### バックエンド

```bash
cd backend
npx @langchain/langgraph-cli dev
```

### フロントエンド

```bash
cd frontend
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとチャットボット UI が表示されます。

## 参考動画

[![Next.js + LangGraph Chatbot Template](https://img.youtube.com/vi/qdjuCaSh51c/0.jpg)](https://www.youtube.com/watch?v=qdjuCaSh51c)
