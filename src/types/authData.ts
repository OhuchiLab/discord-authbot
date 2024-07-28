// 学年の型定義をインポート
import Grade from '../entities/grade';

interface AuthData {
    name?: string;              // ユーザの名前
    student_number?: string;    // ユーザの学籍番号
    grade?: Grade;              // ユーザの学年
    mail?: string;              // ユーザのメールアドレス
    discordId?: string;         // ユーザのDiscord ID
}

// AuthDataをエクスポート
export default AuthData;