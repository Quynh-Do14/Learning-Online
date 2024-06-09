import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import InputSelectCommon from '../../../infrastructure/common/components/input/select-common';
import InputDateCommon from '../../../infrastructure/common/components/input/input-date';
import { convertStringToBoolean } from '../../../infrastructure/helper/helper';
import InputPasswordCommon from '../../../infrastructure/common/components/input/input-password';
import Constants from '../../../core/common/constants';
import UploadImage from '../../../infrastructure/common/components/input/upload-image';
import teacherService from '../../../infrastructure/repositories/teacher/service/teacher.service';

const ViewTeacherManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [detailTeacher, setDetailTeacher] = useState<any>({});


    const [_data, _setData] = useState<any>({});
    const dataTeacher = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.TEACHER_MANAGEMENT)
    };
    const setDataTeacher = (data: any) => {
        Object.assign(dataTeacher, { ...data });
        _setData({ ...dataTeacher });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onGetParkingByIdAsync = async () => {
        try {
            await teacherService.getTeacherById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailTeacher(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetParkingByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailTeacher) {
            setDataTeacher({
                name: detailTeacher.user?.name,
                email: detailTeacher.user?.email,
                username: detailTeacher.user?.username,
                password: detailTeacher.user?.password,
                dob: detailTeacher.user?.dob,
                phoneNumber: detailTeacher.user?.phoneNumber,
                cccd: detailTeacher.cccd,
                sex: detailTeacher.sex,
                level: detailTeacher.level,
                discipline: {
                    id: 1
                },
            });
        };
    }, [detailTeacher]);

    const onUpdateParking = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await teacherService.updateTeacher(
                Number(param.id),
                {
                    name: dataTeacher.name,
                    email: dataTeacher.email,
                    username: dataTeacher.username,
                    password: dataTeacher.password,
                    dob: dataTeacher.dob,
                    phoneNumber: dataTeacher.phoneNumber,
                    cccd: dataTeacher.cccd,
                    sex: convertStringToBoolean(dataTeacher.sex),
                    level: dataTeacher.level,
                    discipline: {
                        id: 1
                    },
                },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <ManageLayout breadcrumb={"Quản lý giáo viên"} title={"Thông tin giáo viên"} redirect={ROUTE_PATH.TEACHER_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadImage
                                attributeImg={dataTeacher.avatar}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên giáo viên"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.name}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.email}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên đăng nhập"}
                                        attribute={"username"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.username}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputPasswordCommon
                                        label={"Mật khẩu"}
                                        attribute={"password"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.password}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày sinh"}
                                        attribute={"dob"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.dob}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={false}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"SĐT"}
                                        attribute={"phoneNumber"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.phoneNumber}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"CCCD"}
                                        attribute={"cccd"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.cccd}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Giới tính"}
                                        attribute={"sex"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.sex}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.Gender.List}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Trình độ học vấn"}
                                        attribute={"level"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.level}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onBack}
                            classColor="blue"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onUpdateParking}
                            classColor="orange"
                            icon={null}
                            title={'Cập nhật'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout>
    )
}

export default ViewTeacherManagement