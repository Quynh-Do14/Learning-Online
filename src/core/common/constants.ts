import { CalendarOutlined, ContainerOutlined, DatabaseOutlined, EnvironmentOutlined, MessageOutlined, ProjectOutlined, ScheduleOutlined, TableOutlined, TagOutlined, TagsOutlined, UserOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "./appRouter";

export default class Constants {
    static Menu = class {
        static List = [
            {
                label: "Quản lý danh mục",
                link: ROUTE_PATH.CATEGORY_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý khóa học",
                link: ROUTE_PATH.COURSE_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý bài giảng",
                link: ROUTE_PATH.LESSON_MANAGEMENT,
                icon: UserOutlined
            },
            {
                label: "Quản lý giáo viên",
                link: ROUTE_PATH.TEACHER_MANAGEMENT,
                icon: UserOutlined
            },
        ]
    };
    static MenuClient = class {
        static List = [
            {
                label: "Trang chủ",
                link: ROUTE_PATH.HOME_PAGE,
            },
            {
                label: "Khóa học",
                link: ROUTE_PATH.LIST_COURSE,
            },
            {
                label: "Giáo viên",
                link: ROUTE_PATH.LIST_TEACHER,
            },
            {
                label: "Tài liệu",
                link: ROUTE_PATH.LIST_DOCUMENT,
            }
        ]
    };
    static TOKEN = "token";
    static DEBOUNCE_SEARCH = 800;

    static Params = class {
        static limit = "limit";
        static page = "page";
        static searchName = "searchName";
        static search = "search";
        static idDanhMuc = "idDanhMuc";
        static parentId = "parentId"
    }

    static PaginationClientConfigs = class {
        static Size = 6;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "6", value: 6 },
            { label: "12", value: 12 },
            { label: "48", value: 48 },
        ]
    };

    static PaginationConfigs = class {
        static Size = 10;
        static SizeSearchPage = 8;
        static LimitSize = 60;
        static AllSize = 9000;
        static PageSizeList = [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
        ]
    };

    static UseParams = class {
        static Id = ":id"
    }

    static TabCourse = class {
        static List = [
            { label: "Hình ảnh", value: 1 },
            { label: "Mô tả khóa học", value: 2 },
            { label: "Giáo viên giảng dạy", value: 3 },
        ]
    }

    static Gender = class {
        static MALE = class {
            static value = true;
            static label = "Nam";
            static position = "Thầy";
        }
        static FEMALE = class {
            static value = false;
            static label = "Nữ";
            static position = "Cô";
        }
        static List = [
            { label: "Nam", value: true },
            { label: "Nữ", value: false },
        ]
    }
};