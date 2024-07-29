import Member from "../entities/member";
import { db } from "../infra/firebase";

async function getMembers(): Promise<Member[]> {
  const snapshot = await db.collection("members").get();
  const members: Member[] = snapshot.docs.map((doc) =>
    ConvertToMembers({
      id: doc.id,
      ...doc.data(),
    })
  );
  return members;
}

function ConvertToMembers(docData: FirebaseFirestore.DocumentData): Member {
  return {
    id: docData.id,
    name: docData.name,
    student_number: docData.student_number,
    grade: docData.grade,
    mail: docData.mail,
    discordId: docData.discordId,
  };
}

export default getMembers;
