import CustomRole from "../types/customRole";
import makeGradeRole from "../utils/makeGradeRole";

const b4Role: CustomRole = makeGradeRole({ grade: "B4", color: [0, 112, 255], reason: "B4 Grade Role" });
const m1Role: CustomRole = makeGradeRole({ grade: "M1", color: [0, 176, 80], reason: "M1 Grade Role" });
const m2Role: CustomRole = makeGradeRole({ grade: "M2", color: [255, 192, 0], reason: "M2 Grade Role" });
const d1Role: CustomRole = makeGradeRole({ grade: "D1", color: [255, 0, 0], reason: "D1 Grade Role" });
const d2Role: CustomRole = makeGradeRole({ grade: "D2", color: [112, 48, 160], reason: "D2 Grade Role" });
const d3Role: CustomRole = makeGradeRole({ grade: "D3", color: [255, 0, 255], reason: "D3 Grade Role" });
const teacherRole: CustomRole = makeGradeRole({ grade: "TEACHER", color: [0, 0, 0], reason: "Teacher Grade Role" });
const obogRole: CustomRole = makeGradeRole({ grade: "OB/OG", color: [128, 128, 128], reason: "OB/OG Grade Role" });

export { b4Role, m1Role, m2Role, d1Role, d2Role, d3Role, teacherRole, obogRole };
