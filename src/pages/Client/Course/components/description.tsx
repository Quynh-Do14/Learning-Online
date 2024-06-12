import { Col, Row, Tooltip } from 'antd'
import noAvatar from "../../../../assets/images/no-avatar.png"
import { configGender, configImageURL, formatCurrencyVND } from '../../../../infrastructure/helper/helper'
type Props = {
    tab: number,
    detailCourse: any,
    detailTeacher: any,
    detailSuggestion: Array<any>,
}
const DescriptionCourse = (props: Props) => {
    const {
        detailCourse,
        detailTeacher,
        tab,
        detailSuggestion,
    } = props;
    return (
        <div className='border-b-[1px] border-b-[#d4d4d4] pb-3'>
            <Row gutter={[25, 20]}>
                <Col span={14}>
                    {
                        tab == 1
                            ?
                            <div className='flex flex-col gap-2'>
                                <p className='text-[16px] font-semibold text-[#1e293be3]'>Mô tả khóa học</p>
                                <div dangerouslySetInnerHTML={{ __html: detailCourse.description }} />
                            </div>
                            :
                            tab == 2
                                ?
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[16px] font-semibold text-[#1e293be3]'>Thông tin giáo viên</p>
                                    <Row align={"top"} gutter={[20, 20]}>
                                        <Col span={12}>
                                            <img src={detailTeacher?.user?.avatar || noAvatar} alt="" className='w-full' />
                                        </Col>
                                        <Col span={12} className='flex flex-col gap-4'>
                                            <div className='text-truncate text-[14px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>
                                                {configGender(detailTeacher?.sex)}: {detailTeacher?.user?.name}
                                            </div>
                                            <div className='text-[14px] font-semibold'>{detailTeacher?.discipline?.name}</div>
                                            <div className='text-truncate-3 text-[14px]'>{detailTeacher?.level}</div>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                tab == 3
                                    ?
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-[16px] font-semibold text-[#1e293be3]'>Đối tượng hướng tới</p>
                                        <div dangerouslySetInnerHTML={{ __html: detailCourse.object }} />
                                    </div>
                                    :

                                    <div className='flex flex-col gap-2'>
                                        <p className='text-[16px] font-semibold text-[#1e293be3]'>Kêt quả đạt được</p>
                                        <div dangerouslySetInnerHTML={{ __html: detailCourse.result }} />
                                    </div>
                    }
                </Col>
                <Col span={10} className='flex flex-col gap-2'>
                    <p className='text-[16px] font-semibold text-[#1e293be3]'>Khóa học liên quan</p>
                    {
                        detailSuggestion && detailSuggestion.length
                            ?
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
                            :
                            <div className='text-[16px] font-semibold text-[#1e293be3] text-center py-2'>
                                Chưa có khóa học liên quan !!!
                            </div>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default DescriptionCourse