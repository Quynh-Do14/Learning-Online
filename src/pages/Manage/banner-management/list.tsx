import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Table } from 'antd'

import Column from 'antd/es/table/Column'
import { PlusOutlined } from '@ant-design/icons'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { useNavigate } from 'react-router-dom';
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm'
import Constants from '../../../core/common/constants'
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout'
import { PaginationCommon } from '../../../infrastructure/common/components/pagination/Pagination'
import { TitleTableCommon } from '../../../infrastructure/common/components/text/title-table-common'
import { ActionCommon } from '../../../infrastructure/common/components/action/action-common'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import bannerService from '../../../infrastructure/repositories/banner/service/banner.service'
import { configImageURL } from '../../../infrastructure/helper/helper'

let timeout: any
const ListBannerManagement = () => {
    const [listCategory, setListCategory] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [idSelected, setIdSelected] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListCategoryAsync = async ({ name = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
        }
        try {
            await bannerService.getBanner(
                param,
                setLoading
            ).then((res) => {
                setListCategory(res.content)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1,) => {
        await onGetListCategoryAsync({ name: name, size: size, page: page });
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

    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteCategory = async () => {
        setIsDeleteModal(false);
        try {
            await bannerService.deleteBanner(
                Number(idSelected),
                setLoading
            ).then((res) => {
                if (res) {
                    onSearch().then(() => { })
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_BANNER_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <ManageLayout breadcrumb={"Quản lý ảnh quảng cáo"} title={"Danh sách ảnh quảng cáo"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"end"} align={"middle"}>
                    <Col>
                        <ButtonCommon
                            icon={<PlusOutlined />}
                            classColor="green"
                            onClick={() => navigate(ROUTE_PATH.ADD_BANNER_MANAGEMENT)}
                            title={"Thêm mới"} />
                    </Col>
                </Row>
            </div>
            <div className='flex-1 overflow-auto bg-[#FFFFFF] content-page'>
                <Table
                    dataSource={listCategory}
                    pagination={false}
                    className='table-common'
                >
                    <Column
                        title={"STT"}
                        dataIndex="stt"
                        key="stt"
                        width={"5%"}
                        render={(val, record, index) => (
                            <div style={{ textAlign: "center" }}>
                                {index + 1 + pageSize * (currentPage - 1)}
                            </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tên"
                                width={'200px'}
                            />
                        }
                        key={"image"}
                        dataIndex={"image"}
                        render={(val) => {
                            return (
                                <Image src={configImageURL(val.fileCode)} />
                            )
                        }}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                                width={"60px"}
                            />
                        }
                        width={"60px"}
                        fixed="right"
                        align='center'
                        render={(action, record: any) => (
                            // <Space
                            //     size="small"
                            // >
                            //     <Dropdown
                            //         trigger={["hover"]}
                            //         placement="bottomRight"
                            //         overlay={listAction(record)}
                            //     >
                            //         <MenuOutlined className="pointer" />
                            //     </Dropdown>
                            // </Space>
                            <ActionCommon
                                onClickDetail={() => onNavigate(record.id)}
                                onClickDelete={() => onOpenModalDelete(record.id)}
                            />
                        )}
                    />
                </Table>
            </div>
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
            <DialogConfirmCommon
                message={"Bạn có muốn xóa ảnh quảng cáo này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa ảnh quảng cáo"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteCategory}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ListBannerManagement