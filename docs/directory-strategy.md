# ディレクトリ戦略

## 概略

discord_authbot/  
│  
├── docs/ # 開発のためのドキュメントを格納するディレクトリ  
└── src/ # ソースコードを格納するディレクトリ  
　　　 ├── commands/ # Discord Bot に実装するコマンドを格納するディレクトリ  
　　　 ├── controllers/ # インフラ(現時点では firebase)に対するインターフェースを格納するディレクトリ  
　　　 ├── entities/ # インフラで扱うデータの型を定義し，格納するディレクトリ  
　　　 ├── events/ # Bot で扱うイベントハンドラを格納するディレクトリ  
　　　 ├── infra/ # インフラを定義し，格納するディレクトリ  
　　　 ├── roles/ # Discord Bot で扱うロールを定義し，格納するディレクトリ  
　　　 ├── types/ # プロジェクトで使用する型を定義し，格納するディレクトリ  
　　　 ├── usecases/ # インフラに対する直接的な操作を格納するディレクトリ  
　　　 ├── utils/ # 汎用的な機能を格納するディレクトリ  
　　　 ├── deployCommands.ts # コマンドを Discord Bot に対してデプロイするスクリプト  
　　　 ├── loadCommands.ts # Bot を稼働するときにコマンドをすべて読み込むスクリプト  
　　　 └── main.ts # メインエントリ

## 詳細

それぞれのディレクトリの役割について説明します

### commands

Discord Bot に対して実装するコマンドを格納します。
1 コマンドにつき、1 ファイルを作成します

### controllers

インフラに対するインターフェースを格納します
現時点では firebase に対するインターフェースになっています

### entities

インフラで扱うデータの型を定義し、格納します
e.g. Member

### events

Discord Bot で扱うイベントハンドラをイベントごとに実装し、格納します
実装したイベントは`eventHandler.ts`からクライアントに実装されるべきです

### infra

インフラを定義し、格納します
現状では、`firestore`, `firebase-admin`が定義され格納されています

### roles

Discord Bot で扱う`Role`のプロパティを定義し、格納します
現状では、1 ロールに対して 1 ファイルを作成していますが、屋や冗長に思えるので将来的に廃止される可能性があります

### types

プロジェクトで使用する型を定義し格納します

### usecases

インフラに対する直接的な操作を実装し、格納します

### utils

上記のどこにも属さず、プロジェクト全体で使うような汎用的な機能を実装し、格納します

## root files

### deployCommands.ts

コマンドを Discord Bot に対してデプロイするためのスクリプトです
新たにコマンドを実装した際には、`npm run deploy-commands`を実行して Bot にデプロイする必要があります

### loadCommands.ts

Bot を稼働した際に、`commands`フォルダで実装されているコマンドを全て読み込むためのスクリプトです
個別に実行する必要はありません

### main.ts

エントリポイントです。
