import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Row } from 'antd'
import { InputSearchCommon } from '../../../infrastructure/common/components/input/input-search-common'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import BannerHomePage from './components/banner'
import CourseList from './components/course'
import { useEffect, useState } from 'react'
import courseService from '../../../infrastructure/repositories/course/service/course.service'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'

const HomePage = () => {
    const [listCourse, setListCourse] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    const onGetListCourseAsync = async () => {
        const param = {
            page: 0,
            size: 8,
        }
        try {
            await courseService.getCourse(
                param,
                setLoading
            ).then((res) => {
                setListCourse(res.content)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListCourseAsync().then(_ => { });
    }, [])

    return (
        <LayoutClient>
            <div className='flex flex-col gap-6'>
                <BannerHomePage />
                <div className='bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col gap-2'>
                    <p className='font-bold text-[13px] text-[#1e293bb3]'>Tìm kiếm khóa học</p>
                    <Row gutter={[10, 10]} align={"middle"} justify={"space-between"}>
                        <Col xs={24} sm={18} md={20} lg={20}>
                            <InputSearchCommon
                                placeholder={'Tìm kiếm theo tên khóa học'}
                                value={''}
                                onChange={() => { }}
                                disabled={false}
                            />
                        </Col>
                        <Col xs={24} sm={6} md={4} lg={4} className=''>
                            <ButtonCommon
                                classColor={'orange'}
                                onClick={() => { }
                                } title={'Tìm kiếm'}
                            />
                        </Col>
                    </Row>
                </div>
                <CourseList listCourse={listCourse} />
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default HomePage