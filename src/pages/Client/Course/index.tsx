import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Row, Tooltip } from 'antd'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { ShowStarCommon } from '../../../infrastructure/common/components/controls/ShowStar'
import { configImageURL, formatCurrencyVND } from '../../../infrastructure/helper/helper'
import { useNavigate } from 'react-router-dom'
import { InputSearchCommon } from '../../../infrastructure/common/components/input/input-search-common'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import courseService from '../../../infrastructure/repositories/course/service/course.service'
import Constants from '../../../core/common/constants'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { PaginationCommon } from '../../../infrastructure/common/components/pagination/Pagination'

let timeout: any
const ListCoursePage = () => {
    const [listCourse, setListCourse] = useState<Array<any>>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(Constants.PaginationClientConfigs.Size);
    const [searchText, setSearchText] = useState<string>("");
    const [selectAddress, setSelectAddress] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const onGetListCourseAsync = async ({ name = "", address = "", size = pageSize, page = currentPage, startDate = "", endDate = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
            address: address,
        }
        try {
            await courseService.getCourse(
                param,
                setLoading
            ).then((res) => {
                setListCourse(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", address = "", size = pageSize, page = 1, startDate = "", endDate = "") => {
        await onGetListCourseAsync({ name: name, address: address, size: size, page: page, startDate: startDate, endDate: endDate });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, selectAddress, pageSize, currentPage, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, selectAddress, pageSize, value, startDate, endDate).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, selectAddress, value, 1, startDate, endDate).then(_ => { });
    }

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.DETAIL_COURSE).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <LayoutClient>
            <div className='flex flex-col gap-6'>

                <div className='bg-[#FFF] px-3 py-5 rounded-[4px] flex flex-col gap-2'>
                    <p className='font-bold text-[13px] text-[#1e293bb3]'>Tìm kiếm khóa học</p>
                    <Row gutter={[10, 10]} align={"middle"} justify={"space-between"}>
                        <Col xs={24} sm={18} md={20} lg={20}>
                            <InputSearchCommon
                                placeholder={'Tìm kiếm theo tên khóa học'}
                                value={searchText}
                                onChange={onChangeSearchText}
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
                <Row gutter={[15, 15]}>
                    {
                        listCourse.map((it, index) => {
                            return (
                                <Col
                                    xs={24} sm={12} md={8} lg={6}
                                    key={index}
                                >
                                    <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                        onClick={() => onNavigate(it.id)}
                                    >
                                        <div className='w-full h-[50%]'>
                                            <img src={configImageURL(it.courseImage?.fileCode)} alt="" className='w-full h-full' />
                                        </div>
                                        <Tooltip
                                            title={it.name}
                                            color='#1e293bb3'
                                        >
                                            <div className='text-truncate text-[13px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>{it.name}</div>
                                        </Tooltip>
                                        <div>
                                            <ShowStarCommon
                                                star={5}
                                            />
                                        </div>
                                        <div className='flex gap-1 items-center text-[14px] font-semibold text-[#d63939] '>
                                            <p>Giá:</p>
                                            <p>{formatCurrencyVND(String(it.cost))} </p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <div className='flex flex-col'>
                    <PaginationCommon
                        total={total}
                        currentPage={currentPage}
                        onChangePage={onChangePage}
                        pageSize={pageSize}
                        onChangeSize={onPageSizeChanged}
                        disabled={false}
                        isClient={true}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default ListCoursePage