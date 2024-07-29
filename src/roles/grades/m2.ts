import CustomRole from "../../types/customRole";
import makeGradeRole from "../../utils/makeGradeRole";

const m2Role: CustomRole = makeGradeRole({ grade: "M2", color: [255, 192, 0], reason: "M2 Grade Role" });

export default m2Role;
