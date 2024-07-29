import CustomRole from "../../types/customRole";
import makeGradeRole from "../../utils/makeGradeRole";

const teacherRole: CustomRole = makeGradeRole({ grade: "TEACHER", color: [0, 0, 0], reason: "Teacher Grade Role" });

export default teacherRole;
