import CustomRole from "../../types/customRole";
import makeGradeRole from "../../utils/makeGradeRole";

const d3Role: CustomRole = makeGradeRole({ grade: "D3", color: [255, 0, 255], reason: "D3 Grade Role" });
export default d3Role;
