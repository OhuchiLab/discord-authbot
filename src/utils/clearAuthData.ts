import AuthData from "../types/authData";

function clearAuthData(): AuthData {
  return {
    name: undefined,
    student_number: undefined,
    grade: undefined,
    mail: undefined,
    discordId: undefined,
  };
}

export default clearAuthData;
