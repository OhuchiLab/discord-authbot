import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import CommandWithArgs from "../types/commandWithArgs";
import Member from "../entities/member";
import { addMember } from "../controllers/memberController";
import Grade from "../entities/grade";
import checkIsAdmin from "../utils/checkMemberRole";

const registerCommand: CommandWithArgs = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("新しいメンバーを登録します")
    .addStringOption((option) => option.setName("name").setDescription("名前").setRequired(true))
    .addStringOption((option) => option.setName("student_number").setDescription("学籍番号").setRequired(true))
    .addStringOption((option) => option.setName("grade").setDescription("学年").setRequired(true))
    .addStringOption((option) =>
      option.setName("mail").setDescription("メールアドレス").setRequired(true)
    ) as SlashCommandBuilder,
  execute: addMemberCommandHandler,
};

async function addMemberCommandHandler(interaction: CommandInteraction) {
  // Direct Messageの場合はエラーを返す
  if (!interaction.guild) {
    await interaction.reply("このコマンドはDMでは使用できません");
    return;
  }

  // 管理者権限があるか確認
  const isAdmin: boolean = await checkIsAdmin(interaction);
  if (!isAdmin) {
    await interaction.reply("このコマンドは管理者のみが使用できます");
    return;
  }

  // 引数が正しいか確認
  const isArgsValid: boolean = validateArgs(
    interaction.options.get("mail")?.value as string,
    interaction.options.get("grade")?.value as string,
    interaction.options.get("student_number")?.value as string
  );
  if (!isArgsValid) {
    await interaction.reply("引数が正しくありません");
    return;
  }

  await addMember({
    name: interaction.options.get("name")?.value as string,
    mail: interaction.options.get("mail")?.value as string,
    grade: interaction.options.get("grade")?.value as string,
    student_number: interaction.options.get("student_number")?.value as string,
  } as Member);

  await interaction.reply(`${interaction.options.get("name")?.value}メンバーを登録しました`);
}

function validateArgs(mail: string, grade: string, studentNumber: string): boolean {
  return validateEmail(mail) && validateGrade(grade) && validateStudentNumber(studentNumber);
}

function validateEmail(email: string): boolean {
  // メールアドレスの末尾が@shizuoka.ac.jpで終わっていることを確認
  return email.endsWith("@shizuoka.ac.jp");
}

function validateGrade(grade: string): boolean {
  // Gradeの値であることを確認
  return Object.values(Grade).includes(grade as Grade);
}

function validateStudentNumber(studentNumber: string): boolean {
  // とりあえず8桁の数字であることを確認
  return studentNumber.length === 8;
}
