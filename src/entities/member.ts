import Grade from "./grade";

interface Member {
  id?: string;
  name: string;
  student_number: string;
  grade: Grade;
  mail: string;
  discordId: string;
}

export default Member;
