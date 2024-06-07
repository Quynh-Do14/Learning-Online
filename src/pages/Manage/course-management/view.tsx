import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import courseService from '../../../infrastructure/repositories/course/service/course.service';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import { PlusCircleOutlined } from '@ant-design/icons';

const ViewCourseManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [detailParking, setDetailParking] = useState<any>({});
    const [detaiBlock, setDetaiBlock] = useState<any>([]);

    const [listBlock, setListBlock] = useState<Array<any>>([
        {
            index: 0,
            block: {
                blockCode: ""
            },
            numberOfParkingSlots: 0
        },
    ])

    const [_data, _setData] = useState<any>({});
    const dataParking = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.COURSE_MANAGEMENT)
    };
    const setDataParking = (data: any) => {
        Object.assign(dataParking, { ...data });
        _setData({ ...dataParking });
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
            await courseService.getCourseById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailParking(res)
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
        if (detailParking) {
            setDataParking({
                name: detailParking.name,
                address: detailParking.address,
                reentryAllowed: detailParking.reentryAllowed,
                operatingCompanyName: detailParking.operatingCompanyName,
                valetParkingAvailable: detailParking.valetParkingAvailable,
            });
        };
        if (detailParking.blockAndParkingSlots) {
            const newArr = detailParking.blockAndParkingSlots?.map((it: any) => {
                return {
                    block: {
                        blockCode: it.block.blockCode
                    },
                    numberOfParkingSlots: it.numberOfParkingSlots,
                }

            })
            setListBlock(newArr)
        }
    }, [detailParking]);

    const onUpdateParking = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await courseService.updateCourse(
                Number(param.id),
                {
                    // name: dataParking.name,
                    // address: dataParking.address,
                    // reentryAllowed: convertStringToBoolean(dataParking.reentryAllowed),
                    // operatingCompanyName: dataParking.operatingCompanyName,
                    // valetParkingAvailable: convertStringToBoolean(dataParking.valetParkingAvailable),
                    // blockAndParkingSlots: listBlock
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
        <ManageLayout breadcrumb={"Quản lý bãi đỗ xe"} title={"Thông tin bãi đỗ xe"} redirect={ROUTE_PATH.COURSE_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên bãi đỗ xe"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataParking.name}
                                        setData={setDataParking}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên công ty"}
                                        attribute={"operatingCompanyName"}
                                        isRequired={true}
                                        dataAttribute={dataParking.operatingCompanyName}
                                        setData={setDataParking}
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

export default ViewCourseManagement