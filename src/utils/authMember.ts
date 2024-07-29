import Member from "../entities/member";
import AuthData from "../types/authData";
import getMembers from "../usecases/getMembers";

async function authMember(authData: AuthData): Promise<boolean> {
  const members: Member[] = await getMembers();
  //   membersの中からauthDataと一致するメンバーを探す
  const authMember: Member | undefined = members.find((member: Member) => {
    return (
      member.name === authData.name &&
      member.student_number === authData.student_number &&
      member.mail === authData.mail &&
      member.grade === authData.grade
    );
  });

  return authMember ? true : false;
}

export default authMember;
