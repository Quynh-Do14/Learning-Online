import React, { useEffect, useState } from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Row, Tooltip } from 'antd'
import { configGender, configImageURL } from '../../../infrastructure/helper/helper'
import teacherService from '../../../infrastructure/repositories/teacher/service/teacher.service'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { PaginationCommon } from '../../../infrastructure/common/components/pagination/Pagination'
import Constants from '../../../core/common/constants'
import noAvatar from "../../../assets/images/no-avatar.png"
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../core/common/appRouter'
let timeout: any

const ListTeacherPage = () => {
    const [listTeacher, setListTeacher] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListTeacherAsync = async ({ name = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
        }
        try {
            await teacherService.getTeacher(
                param,
                setLoading
            ).then((res) => {
                setListTeacher(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (name = "", size = pageSize, page = 1) => {
        await onGetListTeacherAsync({ name: name, size: size, page: page, });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1).then(_ => { });
    }

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.DETAIL_TEACHER).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    return (
        <LayoutClient>
            <Row gutter={[15, 15]}>
                {
                    listTeacher.map((it, index) => {
                        return (
                            <Col
                                xs={24} sm={12} md={8} lg={6}
                                key={index}
                            >
                                <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                    onClick={() => onNavigate(it.id)}
                                >
                                    <div>
                                        <img src={configImageURL(it.image?.fileCode) || noAvatar} alt="" className='w-full' />
                                    </div>
                                    <Tooltip
                                        title={it.user?.name}
                                        color='#1e293bb3'
                                    >
                                        <div className='text-truncate text-[14px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>
                                            {configGender(it.sex)}: {it.user?.name}
                                        </div>
                                    </Tooltip>
                                    <p className='text-[14px] font-semibold'>{it.level}</p>
                                    <p className='text-truncate-3 text-[14px]'>{it.discipline?.name}</p>
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
                />
            </div>
            <FullPageLoading isLoading={loading} />
        </LayoutClient>
    )
}

export default ListTeacherPage