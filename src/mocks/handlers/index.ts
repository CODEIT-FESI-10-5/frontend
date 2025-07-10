// 각 페이지별 핸들러들을 여기서 통합합니다.
// 실제 핸들러 구현은 각 하위 폴더에서 진행하면 됩니다.

// 예시용 핸들러들 포함
import { userHandlers } from "./auth";
import { dashboardHandlers } from "./dashboard";
import { todoHandlers } from "./todos";
import { noteHandlers } from "./notes";
import { profileHandlers } from "./profile";
import { studyGroupHandlers } from "./studyGroups";

export const allHandlers = [...userHandlers, ...dashboardHandlers, ...todoHandlers, ...noteHandlers, ...profileHandlers, ...studyGroupHandlers];
