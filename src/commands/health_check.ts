import { SlashCommandBuilder, CommandInteraction, shouldUseGlobalFetchAndWebSocket } from "discord.js";
import { Command } from "../types/command";

const healthCheckCommand: Command = {
  data: new SlashCommandBuilder().setName("health_check").setDescription("Botの状態を確認します"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("I'm alive!");
  },
};

export default healthCheckCommand;
