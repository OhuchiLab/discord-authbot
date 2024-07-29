import CustomRole from "../../types/customRole";
import makeGradeRole from "../../utils/makeGradeRole";

const d1Role: CustomRole = makeGradeRole({ grade: "D1", color: [255, 0, 0], reason: "D1 Grade Role" });
export default d1Role;
