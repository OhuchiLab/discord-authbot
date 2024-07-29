import { CustomClient } from "../types/customClient";
import AuthData from "../types/authData";
import { setupClientReadyHandler } from "./clientReady";
import { setupGuildMemberAddHandler } from "./guildMemberAdd";
import { setupInteractionCreateHandler } from "./interactionCreate";

export function setupEventHandlers(client: CustomClient, userStates: Map<string, AuthData>) {
  setupClientReadyHandler(client);
  setupGuildMemberAddHandler(client);
  setupInteractionCreateHandler(client);
}
