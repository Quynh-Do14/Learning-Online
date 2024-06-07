import { Col, Dropdown, Menu, Row, Space } from 'antd'
import "../../../assets/styles/components/MainLayout.css";
import React, { useEffect, useState } from 'react'
import Constants from '../../../core/common/constants'
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { isTokenStoraged } from '../../utils/storage';
import logo from '../../../assets/images/logo.jpg';
import LoginModal from '../../../pages/Auth/Login';
import avatar from "../../../assets/images/avatar.png"
import authService from '../../repositories/auth/service/auth.service';
import { useRecoilState } from 'recoil';
import { ProfileState } from '../../../core/atoms/profile/profileState';
import DialogConfirmCommon from '../components/modal/dialogConfirm';
const HeaderClient = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dataProfile, setDataProfile] = useState<any>({});
    const [imageUrl, setImageUrl] = useState<any>(null);
    const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);
    const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false);
    const [isOpenModalHistoryShow, setIsOpenModalHistoryShow] = useState<boolean>(false);
    const [isOpenModalReservationShow, setIsOpenModalReservationShow] = useState<boolean>(false);

    const [isLoginClick, setIsLoginClick] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const [, setProfileState] = useRecoilState(ProfileState);

    const getProfileUser = async () => {
        try {
            await authService.profile(
                () => { }
            ).then((response) => {
                if (response) {
                    setDataProfile(response)
                    setProfileState(
                        {
                            user: response,
                        }
                    )
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProfileUser().then(() => { })
    }, [])

    const openModalLogout = () => {
        setIsOpenModalLogout(true);
    };

    const onCloseModalLogout = () => {
        setIsOpenModalLogout(false);
    };

    const onLogOut = async () => {
        setIsOpenModalLogout(false);
        try {
            await authService.logout(
                setLoading
            ).then(() => {
                navigate(ROUTE_PATH.LOGIN);
                window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        dataProfile?.roles?.map((it: any) => {
            if (it.name == "ADMIN") {
                setIsAdmin(true)
            }
        })
    }, [dataProfile])

    const openModalProfile = () => {
        setIsOpenModalProfile(true);
    };

    const onCloseModalProfile = () => {
        setIsOpenModalProfile(false);
    };

    const openModalChangePassword = () => {
        setIsOpenModalChangePassword(true);
    };

    const onCloseModalChangePassword = () => {
        setIsOpenModalChangePassword(false);
    };
    const openModalHistoryShow = () => {
        setIsOpenModalHistoryShow(true);
    };

    const onCloseModalHistoryShow = () => {
        setIsOpenModalHistoryShow(false);
    };

    const openModalReservationShow = () => {
        setIsOpenModalReservationShow(true);
    };

    const onCloseModalReservationShow = () => {
        setIsOpenModalReservationShow(false);
    };
    
    const listAction = () => {
        return (
            <Menu className='action-admin'>
                {
                    isAdmin
                    &&
                    <Menu.Item className='info-admin' onClick={() => { navigate(ROUTE_PATH.MANAGE_LAYOUT) }}>
                        <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                            <svg className='mr-1' fill="#808080" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31,0H1A1,1,0,0,0,0,1V7.67a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM28.67,3.67H30V5H28.67ZM2,2H26.93a1,1,0,0,0-.26.67V6a1,1,0,0,0,.26.67H2Z" />
                                <path d="M31,11.67H1a1,1,0,0,0-1,1v6.66a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V12.67A1,1,0,0,0,31,11.67ZM18.67,15.33H30v1.34H18.67ZM2,13.67H16.93a1,1,0,0,0-.26.66v3.34a1,1,0,0,0,.26.66H2Z" />
                                <path d="M31,23.33H1a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V24.33A1,1,0,0,0,31,23.33ZM28.67,27H30v1.33H28.67ZM2,25.33H26.93a1,1,0,0,0-.26.67v3.33a1,1,0,0,0,.26.67H2Z" />
                            </svg>
                            Quản trị viên
                        </div>
                    </Menu.Item>
                }
                <Menu.Item className='info-admin' onClick={openModalProfile}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="5" r="4" />
                            <path d="M12 9a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9z" />
                        </svg>
                        Thông tin cá nhân
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalChangePassword}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#5e5eff]'>
                        <svg className='mr-1' fill="#808080" height="20px" width="20px" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24" enable-background="new 0 0 24 24" >
                            <path d="M24,19v-2h-2.14c-0.09-0.36-0.24-0.7-0.42-1.02l1.52-1.52l-1.41-1.41l-1.52,1.52c-0.32-0.19-0.66-0.33-1.02-0.42V12h-2v2.14
                            c-0.36,0.09-0.7,0.24-1.02,0.42l-1.52-1.52l-1.41,1.41l1.52,1.52c-0.19,0.32-0.33,0.66-0.42,1.02H12v2h2.14
                            c0.09,0.36,0.24,0.7,0.42,1.02l-1.52,1.52l1.41,1.41l1.52-1.52c0.32,0.19,0.66,0.33,1.02,0.42V24h2v-2.14
                            c0.36-0.09,0.7-0.24,1.02-0.42l1.52,1.52l1.41-1.41l-1.52-1.52c0.19-0.32,0.33-0.66,0.42-1.02H24z M18,20c-1.1,0-2-0.9-2-2
                            s0.9-2,2-2s2,0.9,2,2S19.1,20,18,20z M11,7.41l3.29,3.29l1.41-1.41L12.41,6L13,5.41l2.29,2.29l1.41-1.41L14.41,4L15,3.41l3.29,3.29
                            l1.41-1.41L16.41,2l0.29-0.29l-1.41-1.41L6.89,8.7C6.19,8.26,5.38,8,4.5,8C2.02,8,0,10.02,0,12.5S2.02,17,4.5,17S9,14.98,9,12.5
                            c0-0.88-0.26-1.69-0.7-2.39L11,7.41z M4.5,15C3.12,15,2,13.88,2,12.5S3.12,10,4.5,10S7,11.12,7,12.5S5.88,15,4.5,15z"/>
                        </svg>
                        Đổi mật khẩu
                    </div>
                </Menu.Item>
                <Menu.Item className='info-admin' onClick={openModalLogout}>
                    <div className='info-admin-title px-1 py-2 flex items-center hover:text-[#fc5a5a]' >
                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Đăng xuất
                    </div>
                </Menu.Item>
            </Menu>
        )
    };

    return (
        <div className="header-common header-layout-client">
            <Row justify="space-between">
                <div className="flex gap-4">
                    <div onClick={() => navigate(ROUTE_PATH.HOME_PAGE)} className="flex gap-4 m-auto cursor-pointer" >
                        <img src={logo} alt=""
                            className='w-24'
                        />
                    </div>
                    <div className="m-auto">
                        <ul className="gap-3 flex m-auto">
                            {Constants.MenuClient.List.map((item: any, index: number) => {
                                return (
                                    <li key={index} className={`cursor-pointer text-[15px] text-[#1e293bb3] font-semibold capitalize ${location.pathname.includes(item.link) ? "active" : ""} `} onClick={() => navigate(item.link)} >
                                        <div >
                                            {item.label}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-6'>
                    {/* <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#1e293bb3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> */}
                    <div>
                        {
                            isTokenStoraged()
                                ?
                                <Row align={"middle"} >
                                    <Col className='mr-2 flex flex-col align-bottom'>
                                        <div className='text-[15px] text-[#2a70b8] font-semibold'>
                                            {dataProfile?.name}
                                        </div>
                                        {/* <div className='role'>
                                            {dataProfile.roles[0]?.name}
                                        </div> */}
                                    </Col>
                                    <Col>
                                        <Dropdown overlay={listAction} trigger={['click']}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    <img className='rounded-full cursor-pointer' width={50} height={50} src={imageUrl ? imageUrl : avatar} alt='' />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </Col>
                                </Row>
                                :
                                <div
                                    onClick={() => setIsLoginClick(true)}
                                    className='cursor-pointer text-[16px] text-[#1e293bb3] font-semibold capitalize border-[1px] border-[#1e293bb3] rounded-[8px] px-4 py-1 flex items-center justify-center'
                                >
                                    Đăng nhập
                                </div>
                        }
                    </div>
                </div>


            </Row >
            <LoginModal
                isLoginClick={isLoginClick}
                setIsLoginClick={setIsLoginClick}
                setLoading={setLoading}
            // setDataLogined={undefined}
            // setIsRegisterClick={undefined}
            />
            <DialogConfirmCommon
                message={"Bạn có muốn đăng xuất khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đăng xuất"}
                visible={isOpenModalLogout}
                handleCancel={onCloseModalLogout}
                handleOk={onLogOut}
                title={"Xác nhận"}
            />
            {/*   <ProfileModal
                handleCancel={onCloseModalProfile}
                visible={isOpenModalProfile}
                isLoading={loading}
            />
            <ChangePasswordModal
                handleCancel={onCloseModalChangePassword}
                visible={isOpenModalChangePassword}
                isLoading={loading}
            />
            <ModalReservationShow
                handleCancel={onCloseModalReservationShow}
                visible={isOpenModalReservationShow}
                isLoading={loading}
            />
            <ModalHistory
                handleCancel={onCloseModalHistoryShow}
                visible={isOpenModalHistoryShow}
                isLoading={loading}
            /> */}
        </div >
    )
}

export default HeaderClient