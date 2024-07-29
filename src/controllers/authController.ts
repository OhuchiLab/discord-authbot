import AuthData from "../types/authData";
import sendAuthMail from "../usecases/sendAuthMail";
import { getMemberByEmail } from "./memberController";
import setDiscordId from "../usecases/setDiscordId";
import Member from "../entities/member";

async function sendAuthMailController(userInfo: AuthData) {
  try {
    if (!checkAuthData(userInfo)) {
      throw new Error("Invalid auth data");
    }
    await sendAuthMail(userInfo.mail!, userInfo.student_number!, userInfo.grade!);

    const member = await getMemberByEmail(userInfo.mail!);
    checkMember(member);

    await setDiscordId(member!.id!, userInfo.discordId!);
  } catch (error) {
    console.error("Error sending auth mail:", error);
  }
}

function checkAuthData(userInfo: AuthData): boolean {
  if (!userInfo.mail || !userInfo.student_number || !userInfo.grade || !userInfo.discordId) {
    return false;
  }
  return true;
}

function checkMember(member: Member | undefined): void {
  if (!member) {
    throw new Error("Member not found");
  } else if (!member.id) {
    throw new Error("Member id if not provided");
  }
}

export default sendAuthMailController;
