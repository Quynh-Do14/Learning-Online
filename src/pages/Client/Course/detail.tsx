import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Row, Tooltip } from 'antd'
import { configImageURL, formatCurrencyVND } from '../../../infrastructure/helper/helper'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import Constants from '../../../core/common/constants'
import { BreadcrumbCommon } from '../../../infrastructure/common/components/controls/Breadcumb'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import courseService from '../../../infrastructure/repositories/course/service/course.service'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { useParams } from 'react-router-dom'
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm'

const DetailCourse = () => {
    const [tab, setTab] = useState(2);
    const [loading, setLoading] = useState<boolean>(false);
    const [detailCourse, setDetailCourse] = useState<any>({});
    const [detailTeacher, setDetailTeacher] = useState<any>({});
    const [detailSuggestion, setDetailSuggestion] = useState<Array<any>>([]);
    const [videoURL, setVideoURL] = useState<string>("");
    const [isOpenModalBuyCourse, setIsOpenModalBuyCourse] = useState<boolean>(false);

    const param = useParams();

    const onGetCourseByIdAsync = async () => {
        try {
            await courseService.getCourseById(
                Number(param.id),
                setLoading
            ).then((res) => {
                setDetailCourse(res?.course)
                setVideoURL(res.course?.courseVideo?.fileCode)
                setDetailSuggestion(res?.suggestions)
                setDetailTeacher(res.course?.teacher)
            })
        }
        catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        onGetCourseByIdAsync().then(_ => { });
    }, []);

    const openModalBuyCourse = () => {
        setIsOpenModalBuyCourse(true);
    };

    const onCloseModalBuyCourse = () => {
        setIsOpenModalBuyCourse(false);
    };

    const onBuyCourseAsync = async () => {
        try {
            await courseService.buyCourse(
                Number(param.id),
                () => { },
                setLoading
            ).then((response) => {
                onCloseModalBuyCourse();
                window.open(response.payUrl, '_blank');
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <LayoutClient>
            <div className='flex flex-col gap-6 bg-[#FFF] px-4 py-5'>
                <BreadcrumbCommon
                    title={detailCourse.name}
                    breadcrumb={'Trang chủ'}
                    redirect={ROUTE_PATH.HOME_PAGE}
                />
                <Row gutter={[25, 20]}>
                    <Col span={14}>
                        {
                            videoURL?.length
                            &&
                            <video style={{ width: "100%", height: "100%" }} controls>
                                <source
                                    src={configImageURL(videoURL)}
                                    type="video/mp4"
                                />
                            </video>
                        }

                    </Col>
                    <Col span={10}>
                        <div className='flex flex-col gap-2'>
                            <p className='text-[24px] font-semibold text-[#2a70b8]'>{detailCourse.name} </p>
                            <p className='text-[14px] font-semibold text-[#1e293bb3]'>(Còn lại {detailCourse.remain} khóa) </p>
                            <div className='flex gap-1 items-center text-[16px] font-semibold'>
                                <p className='text-[#1e293bb3]'>Giáo viên:</p>
                                <p className='text-[#2a70b8]'>{detailTeacher?.user?.name} </p>
                            </div>
                            <div className='flex gap-1 items-center text-[24px] font-semibold text-[#d63939]'>
                                <p>Giá:</p>
                                <p>{formatCurrencyVND(String(detailCourse.cost))} </p>
                                <p>/</p>
                                <p>khóa</p>
                            </div>
                            <div className='flex'>
                                <ButtonCommon
                                    classColor={'orange'}
                                    onClick={openModalBuyCourse}
                                    title={'Mua ngay'} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[25, 10]} className='border-b-[1px] border-b-[#1e293b54]'>
                    {
                        Constants.TabCourse.List.map((it, index) => {
                            return (
                                <Col key={index} onClick={() => setTab(it.value)}>
                                    <div className={`${tab == it.value && "text-[#2a70b8] border-b-[3px] border-b-[#2a70b8]"} text-[15px] font-semibold text-[#1e293bb3] py-2 cursor-pointer`}>{it.label}</div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row gutter={[25, 20]}>
                    <Col span={14}>
                        {
                            tab == 1
                                ?
                                <img src={configImageURL(detailCourse.courseImage?.fileCode)} alt="" className='w-full' />
                                :
                                tab == 2
                                    ?
                                    // <div className='flex flex-col gap-4'>
                                    //     <div className='flex flex-col gap-2'>
                                    //         <p className='text-[14px] font-semibold text-[#1e293be3]'>Hệ thống bài giảng của khóa học:</p>
                                    //         <ul className='list-disc text-[14px] text-[#1e293bb3] pl-4'>
                                    //             <li>Các bài giảng được chia thành 11 chuyên đề tổng hợp, tập trung ở 3 phân môn "Chính tả", "Tập làm văn", "Luyện từ và câu".</li>
                                    //             <li>Tóm lược kiến thức cần nhớ, mở rộng và nâng cao kiến thức so với chương trình sách giáo khoa.</li>
                                    //             <li>Hướng dẫn phương pháp làm bài hiệu quả thông qua các dạng bài cụ thể.</li>
                                    //         </ul>
                                    //     </div>
                                    //     <div className='flex flex-col gap-2'>
                                    //         <p className='text-[14px] font-semibold text-[#1e293be3]'>Để việc học tập đạt hiệu quả cao, các con cần tuân thủ những điều sau:</p>
                                    //         <ul className='list-disc text-[14px] text-[#1e293bb3] pl-4'>
                                    //             <li>Các bài giảng được chia thành 11 chuyên đề tổng hợp, tập trung ở 3 phân môn "Chính tả", "Tập làm văn", "Luyện từ và câu".</li>
                                    //             <li>Tóm lược kiến thức cần nhớ, mở rộng và nâng cao kiến thức so với chương trình sách giáo khoa.</li>
                                    //             <li>Hướng dẫn phương pháp làm bài hiệu quả thông qua các dạng bài cụ thể.</li>
                                    //         </ul>
                                    //     </div>
                                    //     <div className='flex flex-col gap-2'>
                                    //         <p className='text-[14px] font-semibold text-[#1e293be3]'>Để việc học tập đạt hiệu quả cao, các con cần tuân thủ những điều sau:</p>
                                    //         <ul className='list-disc text-[14px] text-[#1e293bb3] pl-4'>
                                    //             <li>Các bài giảng được chia thành 11 chuyên đề tổng hợp, tập trung ở 3 phân môn "Chính tả", "Tập làm văn", "Luyện từ và câu".</li>
                                    //             <li>Tóm lược kiến thức cần nhớ, mở rộng và nâng cao kiến thức so với chương trình sách giáo khoa.</li>
                                    //             <li>Hướng dẫn phương pháp làm bài hiệu quả thông qua các dạng bài cụ thể.</li>
                                    //         </ul>
                                    //     </div>
                                    // </div>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-[14px] font-semibold text-[#1e293be3]'>Mô tả khóa học:</p>
                                            <div dangerouslySetInnerHTML={{ __html: detailCourse.description }} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-[14px] font-semibold text-[#1e293be3]'>Đối tượng hướng tới:</p>
                                            <div dangerouslySetInnerHTML={{ __html: detailCourse.object }} />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className='text-[14px] font-semibold text-[#1e293be3]'>Kêt quả đạt được:</p>
                                            <div dangerouslySetInnerHTML={{ __html: detailCourse.result }} />
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex flex-col gap-2'>
                                                <p className='text-[14px] font-semibold text-[#1e293be3]'>Thông tin giáo viên</p>
                                                <ul className='list-disc text-[14px] text-[#1e293bb3] pl-4'>
                                                    <li>Giáo viên: {detailTeacher?.user?.name}</li>
                                                    <li>{detailTeacher?.discipline?.name}</li>
                                                    <li>{detailTeacher?.level}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                        }
                    </Col>
                    <Col span={10} className='flex flex-col gap-2'>
                        <p className='text-[14px] font-semibold text-[#1e293be3]'>Khóa học liên quan</p>
                        {
                            detailSuggestion.map((it, index) => {
                                return (
                                    <div key={index} className='shadow-md p-2 rounded-[4px]'>
                                        <Row gutter={[15, 15]}>
                                            <Col span={12}>
                                                <div className='w-full h-[50%]'>
                                                    <img src={configImageURL(it.courseImage?.fileCode)} alt="" className='w-full' />
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div>
                                                    <Tooltip
                                                        title={it.name}
                                                        color='#1e293bb3'
                                                    >
                                                        <div className='text-[13px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>{it.name}</div>
                                                    </Tooltip>
                                                    <div className='flex gap-1 items-center text-[14px] font-semibold text-[#d63939] '>
                                                        <p>Giá:</p>
                                                        <p>{formatCurrencyVND(String(it.cost))} </p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                        }
                    </Col>
                </Row>
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn mua khóa học này?"}
                titleCancel={"Bỏ qua"}
                titleOk={"Đồng ý"}
                visible={isOpenModalBuyCourse}
                handleCancel={onCloseModalBuyCourse}
                handleOk={onBuyCourseAsync}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </LayoutClient >
    )
}

export default DetailCourse