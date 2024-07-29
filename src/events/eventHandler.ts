import { CustomClient } from "../types/customClient";
import AuthData from "../types/authData";
import { setupClientReadyHandler } from "./clientReady";
import { setupGuildMemberAddHandler } from "./guildMemberAdd";
import { setupInteractionCreateHandler } from "./interactionCreate";
import { setupMessageCreate } from "./messageCreate";

export function setupEventHandlers(client: CustomClient, userStates: Map<string, AuthData>) {
  setupClientReadyHandler(client);
  setupGuildMemberAddHandler(client);
  setupInteractionCreateHandler(client);
  setupMessageCreate(client, userStates);
}
