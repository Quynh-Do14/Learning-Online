import { ROUTE_PATH } from "../../core/common/appRouter";
import LoginScreen from "../../pages/Auth/Login";
import HomePage from "../../pages/Client/HomePage";
import DetailCourse from "../../pages/Client/Course/detail";
import ListTeacherPage from "../../pages/Client/Teacher";
import DocumentPage from "../../pages/Client/Document";
import ListCoursePage from "../../pages/Client/Course";
import ManageLayout from "../common/Layouts/Manage-Layout";
import ListCourseManagement from "../../pages/Manage/course-management/list";
import AddCourseManagement from "../../pages/Manage/course-management/add";
import ViewCourseManagement from "../../pages/Manage/course-management/view";
import ListCategoryManagement from "../../pages/Manage/category-management/list";
import AddCategoryManagement from "../../pages/Manage/category-management/add";
import ViewCategoryManagement from "../../pages/Manage/category-management/view";
import ListTeacherManagement from "../../pages/Manage/teacher-management/list";
import AddTeacherManagement from "../../pages/Manage/teacher-management/add";
import ViewTeacherManagement from "../../pages/Manage/teacher-management/view";
import ListLessonManagement from "../../pages/Manage/lesson/list";
import AddLessonManagement from "../../pages/Manage/lesson/add";
import ViewLessonManagement from "../../pages/Manage/lesson/view";

export const privateRoutes = [

    {
        path: ROUTE_PATH.HOME_PAGE,
        component: HomePage,
        private: false,
    },
    {
        path: ROUTE_PATH.LIST_COURSE,
        component: ListCoursePage,
        private: false,
    },
    {
        path: ROUTE_PATH.DETAIL_COURSE,
        component: DetailCourse,
        private: false,
    },
    {
        path: ROUTE_PATH.LIST_TEACHER,
        component: ListTeacherPage,
        private: false,
    },
    {
        path: ROUTE_PATH.LIST_DOCUMENT,
        component: DocumentPage,
        private: false,
    },
    // {
    //     path: ROUTE_PATH.REGISTER,
    //     component: RegisterPage,
    //     private: false,
    // },

    {
        path: ROUTE_PATH.MANAGE_LAYOUT,
        component: ManageLayout,
        private: true,
    },
    {
        path: ROUTE_PATH.CATEGORY_MANAGEMENT,
        component: ListCategoryManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_CATEGORY_MANAGEMENT,
        component: AddCategoryManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_CATEGORY_MANAGEMENT,
        component: ViewCategoryManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.COURSE_MANAGEMENT,
        component: ListCourseManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_COURSE_MANAGEMENT,
        component: AddCourseManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_COURSE_MANAGEMENT,
        component: ViewCourseManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.TEACHER_MANAGEMENT,
        component: ListTeacherManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_TEACHER_MANAGEMENT,
        component: AddTeacherManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_TEACHER_MANAGEMENT,
        component: ViewTeacherManagement,
        private: true,
    },

    {
        path: ROUTE_PATH.LESSON_MANAGEMENT,
        component: ListLessonManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.ADD_LESSON_MANAGEMENT,
        component: AddLessonManagement,
        private: true,
    },
    {
        path: ROUTE_PATH.VIEW_LESSON_MANAGEMENT,
        component: ViewLessonManagement,
        private: true,
    },
]