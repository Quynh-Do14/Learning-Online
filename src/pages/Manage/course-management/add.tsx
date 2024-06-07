import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import courseService from '../../../infrastructure/repositories/course/service/course.service';
import UploadImage from '../../../infrastructure/common/components/input/upload-image';
import TextEditorCommon from '../../../infrastructure/common/components/input/text-editor';
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';

const AddCourseManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const [_data, _setData] = useState<any>({});
    const dataCourse = _data;

    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.COURSE_MANAGEMENT)
    };
    const setDataCourse = (data: any) => {
        Object.assign(dataCourse, { ...data });
        _setData({ ...dataCourse });
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

    const onAddCourseAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await courseService.addCourse({
                name: dataCourse.name,
                category: dataCourse.category,
                cost: dataCourse.cost,
                description: dataCourse.description,
                result: dataCourse.result,
                object: dataCourse.object,
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };
    console.log("dataCourse", dataCourse);

    return (
        <ManageLayout breadcrumb={"Quản lý khóa học"} title={"Thêm khóa học"} redirect={ROUTE_PATH.COURSE_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Thêm mới ảnh</div>
                            <UploadImage
                                attributeImg={dataCourse.avatar}
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
                                        label={"Tên khóa học"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.name}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Danh mục"}
                                        attribute={"category"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.category}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Giá"}
                                        attribute={"cost"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.cost}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <TextEditorCommon
                                        label={'Mô tả'}
                                        id={"description"}
                                        attribute={'description'}
                                        setData={setDataCourse}
                                        dataAttribute={dataCourse.description}
                                        isRequired={true} />
                                </Col>
                                <Col span={24}>
                                    <TextEditorCommon
                                        label={'Kết quả đạt được'}
                                        id={"result"}
                                        attribute={'result'}
                                        setData={setDataCourse}
                                        dataAttribute={dataCourse.result}
                                        isRequired={true} />
                                </Col>
                                <Col span={24}>
                                    <TextEditorCommon
                                        label={'Đối tượng hướng tới'}
                                        id={"object"}
                                        attribute={'object'}
                                        setData={setDataCourse}
                                        dataAttribute={dataCourse.object}
                                        isRequired={true} />
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
                            classColor="black"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onAddCourseAsync}
                            classColor="green"
                            icon={null}
                            title={'Thêm mới'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default AddCourseManagement