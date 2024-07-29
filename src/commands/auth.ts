import { SlashCommandBuilder, CommandInteraction, Guild, Role, GuildMember } from "discord.js";
import { Command } from "../types/command";
import { adminAuth } from "../infra/firebase";
import { getMemberByDiscordId, getMemberByEmail } from "../controllers/memberController";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import createRoleIfNotFound from "../utils/createRoleNotFound";
import addRoleToMember from "../utils/addRoleToMember";
import Grade from "../entities/grade";

// ロールのimport
import b4Role from "../roles/grades/b4";
import m1Role from "../roles/grades/m1";
import m2Role from "../roles/grades/m2";
import d1Role from "../roles/grades/d1";
import d2Role from "../roles/grades/d2";
import d3Role from "../roles/grades/d3";
import teacherRole from "../roles/grades/teacher";
import obogRole from "../roles/grades/obog";
import authorizedRoleProperty from "../roles/authorized";
import unAuthorizedRoleProperty from "../roles/unAuthorized";
import Member from "../entities/member";

const authCommand: Command = {
  data: new SlashCommandBuilder().setName("auth").setDescription("メンバーを認証します"),
  execute: authCommandHandler,
};

async function authCommandHandler(interaction: CommandInteraction) {
  // Direct Messageの場合はエラーを返す
  if (!interaction.guild) {
    await interaction.reply("このコマンドはDMでは使用できません");
    return;
  }

  // FireStoreからメンバー情報を取得
  const member = await getMemberByDiscordId(interaction.user.id);
  if (!member) {
    await interaction.reply("メンバーが見つかりませんでした");
    return;
  }

  // メール認証が完了しているか確認
  const user: UserRecord = await adminAuth.getUserByEmail(member.mail);
  if (user.emailVerified) {
    try {
      await interaction.reply("メール認証が完了しています");
      await giveRoles(interaction);
    } catch (error) {
      console.error("Failed to verify email");
      await interaction.reply("認証に失敗しました");
    }
  } else {
    await interaction.reply("メール認証が完了していません");
  }
}

async function giveRoles(interaction: CommandInteraction) {
  const user = await adminAuth.getUserByEmail(interaction.user.tag);
  const guild: Guild = interaction.guild!;
  const guildMember: GuildMember = await guild.members.fetch(interaction.user.id);

  await giveAuthorizedRole(interaction, guild, guildMember);
  await giveGradeRole(interaction, user, guildMember);
}

async function giveAuthorizedRole(interaction: CommandInteraction, guild: Guild, guildMember: GuildMember) {
  try {
    const authorizedRole: Role = await createRoleIfNotFound({ guild, customRole: authorizedRoleProperty });
    const unAuthorizedRole: Role = await createRoleIfNotFound({ guild, customRole: unAuthorizedRoleProperty });

    await guildMember.roles.add(authorizedRole);
    await guildMember.roles.remove(unAuthorizedRole);

    await interaction.reply("認証しました!");
  } catch (error) {
    console.error("Failed to give Authorized Role");
  }
}

async function giveGradeRole(interaction: CommandInteraction, userAccount: UserRecord, guildMember: GuildMember) {
  const guild: Guild = interaction.guild!;

  //認証用のアカウントから、メンバー情報を取得
  const member: Member | undefined = await getMemberByEmail(userAccount.email!);
  if (!member) {
    throw new Error("Member not found");
    return;
  }
  //  学年に応じてロールを付与
  switch (member.grade) {
    case Grade.B4:
      await addRoleToMember(guild, guildMember, b4Role);
      break;
    case Grade.M1:
      await addRoleToMember(guild, guildMember, m1Role);
      break;
    case Grade.M2:
      await addRoleToMember(guild, guildMember, m2Role);
      break;
    case Grade.D1:
      await addRoleToMember(guild, guildMember, d1Role);
      break;
    case Grade.D2:
      await addRoleToMember(guild, guildMember, d2Role);
      break;
    case Grade.D3:
      await addRoleToMember(guild, guildMember, d3Role);
      break;
    case Grade.TEACHER:
      await addRoleToMember(guild, guildMember, teacherRole);
      break;
    case Grade.OBOG:
      await addRoleToMember(guild, guildMember, obogRole);
      break;
    default:
      break;
  }
}

export default authCommand;