import { Events, Guild, GuildMember, Role } from "discord.js";
import { CustomClient } from "../types/customClient";
import createRoleIfNotFound from "../utils/createRoleNotFound";
import unAuthorizedRoleProperty from "../roles/unAuthorized";

export function setupGuildMemberAddHandler(client: CustomClient) {
  client.on(Events.GuildMemberAdd, async (member: GuildMember) => {
    await sendDirectMessage(member);
    await giveUnauthorizedRole(member);
  });
}

async function sendDirectMessage(member: GuildMember) {
  try {
    await member.send(`ようこそ${member.displayName}さん！ 大内研究室 Discord 認証Botです！`);
    await member.send("名前(フルネーム)を教えてください。");
    console.log(`Sent a welcome message to ${member.displayName}`);
  } catch (error) {
    console.error(`Failed to send a welcome message to ${member.displayName}: ${error}`);
  }
}

async function giveUnauthorizedRole(member: GuildMember) {
  try {
    const guild: Guild = member.guild;
    const role: Role = await createRoleIfNotFound({ guild, customRole: unAuthorizedRoleProperty });
    await member.roles.add(role);
    console.log(`Added Unauthorized role to ${member.displayName}`);
  } catch (error) {
    console.error(`Failed to add Unauthorized role to ${member.displayName}: ${error}`);
  }
}
