import { Guild, Role } from "discord.js";
import CustomRole from "../types/customRole";

type createRoleNotFoundParams = {
  guild: Guild;
  customRole: CustomRole;
};

async function createRoleIfNotFound({ guild, customRole }: createRoleNotFoundParams): Promise<Role> {
  const roles = await guild.roles.fetch();
  let role: Role | undefined = roles.find((r) => r.name === customRole.roleName);
  if (!role) {
    try {
      role = await guild.roles.create({
        name: customRole.roleName,
        color: customRole.color,
        reason: customRole.reason,
      });
      console.log(`Role ${customRole.roleName} created`);
    } catch (error) {
      console.log(`Error creating role ${customRole.roleName}: ${error}`);
      throw error;
    }
  }
  return role;
}

export default createRoleIfNotFound;
