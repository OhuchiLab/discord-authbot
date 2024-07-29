import Member from "../entities/member";
import { v4 as uuidv4 } from "uuid";
import { db } from "../infra/firebase";

async function insertUserData(member: Member): Promise<void> {
  const uniqueId = uuidv4();
  const docRef = await db.collection("members").doc(uniqueId);
  await docRef.set({
    name: member.name,
    student_number: member.student_number,
    grade: member.grade,
    email: member.email,
  });
  console.log("Document written with ID: ", docRef.id);
}

export default insertUserData;
