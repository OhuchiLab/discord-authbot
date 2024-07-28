// 必要なパッケージのインポート
import dotenv from "dotenv";
import { CustomClient } from "./types/customClient";
import { loadCommands } from "./loadCommands";
import { setupEventHandlers } from "./events/setupEventHandlers";
import { AuthData } from "./types/authData";

// .envファイルの読み込み
dotenv.config();

// Botで使うGatewayIntents，partials
const client = new CustomClient();
// Botのトークン
const token = process.env.TOKEN;
// ユーザの状態を保持するMap
const userStates = new Map<string, AuthData>();

// メイン関数
async function main() {
    // トークンの存在確認
    if (!token) {
        console.error("No token provided.");
        process.exit(1);
    }

    // コマンドの読込
    await loadCommands(client);
    setupEventHandlers(client, userStates);

    // Botのログイン
    await client.login(token);
    console.log("Bot is ready.");
}

main().catch(console.error);