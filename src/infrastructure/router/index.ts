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
]