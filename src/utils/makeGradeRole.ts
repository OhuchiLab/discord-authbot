import { ColorResolvable } from "discord.js";
import CustomRole from "../types/customRole";

interface makeGradeRoleProps {
  grade: string;
  color: ColorResolvable;
  reason?: string;
}

function makeGradeRole({ grade, color, reason }: makeGradeRoleProps): CustomRole {
  const role: CustomRole = {
    roleName: "Grade:" + grade,
    color: color,
    reason: reason ? reason : grade + "Grade Role",
  };

  return role;
}

export default makeGradeRole;
