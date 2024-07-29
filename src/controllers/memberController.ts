import insertUserData from "../usecases/insertUserData";
import Member from "../entities/member";
import getMember from "../usecases/getMembers";
import setDiscordId from "../usecases/setDiscordId";

export async function getAllMembers() {
  try {
    const members = await getMember();
    return members;
  } catch (error) {
    console.error("Error getting members:", error);
  }
}

// Emailでメンバを取得し，見つからなければundefinedを返す
export async function getMemberByEmail(email: string): Promise<Member | undefined> {
  try {
    const members = await getMember();
    const member = members.find((m) => m.mail === email);
    return member ? member : undefined;
  } catch (error) {
    console.error("Error getting member by email:", error);
  }
}

// Discord IDでメンバを取得し，見つからなければundefinedを返す
export async function getMemberByDiscordId(discordId: string): Promise<Member | undefined> {
  try {
    const members = await getMember();
    const member = members.find((m) => m.discordId === discordId);
    return member ? member : undefined;
  } catch (error) {
    console.error("Error getting member by discord id:", error);
  }
}

// memberにdiscordIdを追加する
export async function addDiscordId(member: Member, discordId: string): Promise<void> {
  try {
    await setDiscordId(member.id!, discordId);
  } catch (error) {
    console.error("Error adding discord id:", error);
  }
}

export async function addMember(memberData: Member): Promise<void> {
  try {
    await insertUserData(memberData);
    console.log("Member successfully added");
  } catch (error) {
    console.error("Error adding member:", error);
  }
}
