import { ChannelType, Events, Message } from "discord.js";
import { CustomClient } from "../types/customClient";
import AuthData from "../types/authData";
import Grade from "../entities/grade";

export function setupMessageCreate(client: CustomClient, userStates: Map<string, AuthData>) {
  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot || message.channel.type !== ChannelType.DM) return;
    handleDirectMessage(message, userStates);
  });
}

async function handleDirectMessage(message: Message, userStates: Map<string, AuthData>) {
  const userId = message.author.id;
  const userInfo = userStates.get(userId) || {};
  const reply = async (text: string) => message.reply(text);

  if (!userInfo.name) {
    await setUserInfoAndReply(userStates, userId, { name: message.content }, "学籍番号を教えてください", reply);
  } else if (!userInfo.student_number) {
    await validateAndSetStudentNumber(message, userInfo, userStates, userId, reply);
  }
}

async function setUserInfoAndReply(
  userStates: Map<string, AuthData>,
  userId: string,
  update: Partial<AuthData>,
  replyMessage: string,
  reply: (text: string) => Promise<Message>
) {
  const userInfo = userStates.get(userId) || {};
  Object.assign(userInfo, update);
  userStates.set(userId, userInfo);
  await reply(replyMessage);
}

async function validateAndSetStudentNumber(
  message: Message,
  userInfo: AuthData,
  userStates: Map<string, AuthData>,
  userId: string,
  reply: (text: string) => Promise<Message>
) {
  const studentNumber = message.content;
  // 学籍番号の形式が大体正しいかどうかをチェック
  if (!/^[a-zA-Z0-9]{8}$/.test(studentNumber)) {
    await reply("学籍番号の形式が正しくありません。");
    return;
  }
  await setUserInfoAndReply(
    userStates,
    userId,
    { student_number: studentNumber },
    "学年を以下から教えてください: B4, M1, M2, D1, D2, D3, OB/OG",
    reply
  );
}

async function validateAndSetGrade(
  message: Message,
  userInfo: AuthData,
  userStates: Map<string, AuthData>,
  userId: string,
  reply: (text: string) => Promise<Message>
) {
  const gradeInput = message.content.toUpperCase();
  if (gradeInput in Grade) {
    await setUserInfoAndReply(
      userStates,
      userId,
      { grade: Grade[gradeInput as keyof typeof Grade] },
      "メールアドレスを教えてください",
      reply
    );
  } else {
    await reply("学年の形式が正しくありません。学年を以下から教えてください: B4, M1, M2, D1, D2, D3, OB/OG");
  }
}

async function validateAndRegisterUser(
    message: Message,
    userInfo: AuthData,
    userStates: Map<string, AuthData>,
    userId: string,
    reply: (text: string) => Promise<Message>
) {
    const mail = message.content;
    if (mail.endsWith("@shizuoka.ac.jp")) {
        userInfo.mail = mail;
        if (await authMember(userInfo)) {
            try {
                userInfo.discordId = message.author.id;
                await sendAuthMailController(userInfo);
            }
        }
    }
}