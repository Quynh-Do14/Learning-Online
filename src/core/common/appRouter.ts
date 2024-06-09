const PREFIX = "";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    ///Client
    HOME_PAGE: `${PREFIX}/`,
    LIST_COURSE: `${PREFIX}/list-course`,
    DETAIL_COURSE: `${PREFIX}/detail-course/:id`,
    LIST_TEACHER: `${PREFIX}/list-teacher`,
    LIST_DOCUMENT: `${PREFIX}/list-document`,

    ///Management
    MANAGE_LAYOUT: `${PREFIX}/manage-layout`,

    CATEGORY_MANAGEMENT: `${PREFIX}/category`,
    ADD_CATEGORY_MANAGEMENT: `${PREFIX}/category/add`,
    VIEW_CATEGORY_MANAGEMENT: `${PREFIX}/category/view/:id`,

    COURSE_MANAGEMENT: `${PREFIX}/course`,
    ADD_COURSE_MANAGEMENT: `${PREFIX}/course/add`,
    VIEW_COURSE_MANAGEMENT: `${PREFIX}/course/view/:id`,

    TEACHER_MANAGEMENT: `${PREFIX}/teacher`,
    ADD_TEACHER_MANAGEMENT: `${PREFIX}/teacher/add`,
    VIEW_TEACHER_MANAGEMENT: `${PREFIX}/teacher/view/:id`,

    LESSON_MANAGEMENT: `${PREFIX}/lesson`,
    ADD_LESSON_MANAGEMENT: `${PREFIX}/lesson/add`,
    VIEW_LESSON_MANAGEMENT: `${PREFIX}/lesson/view/:id`,
}