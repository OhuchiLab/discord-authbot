import { Events } from "discord.js";
import { CustomClient } from "../types/customClient";
import initializeRoles from "../utils/initializeRoles";

export function setupClientReadyHandler(client: CustomClient) {
  client.on(Events.ClientReady, () => {
    console.log("Ready.");
    if (client.user) {
      console.log(`Logged in as ${client.user.tag}`);

      //   guildのリストを取得
      const guilds = client.guilds.cache;
      if (guilds.size === 0) {
        console.error("No guilds found.");
        throw new Error("No guilds found.");
      } else {
        for (const [, guild] of guilds) {
          initializeRoles(guild);
        }
      }
    }
  });
}
