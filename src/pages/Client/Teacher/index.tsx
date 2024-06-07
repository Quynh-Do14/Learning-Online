import React from 'react'
import LayoutClient from '../../../infrastructure/common/Layouts/Client-Layout'
import { Col, Row, Tooltip } from 'antd'
import { configGender } from '../../../infrastructure/helper/helper'

const data = [
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
    {
        name: "Văn Trịnh Quỳnh An",
        img: "https://hocmai.vn/file.php/1/Anh_giao_vien_THCS_va_TH/Van_Trinh_Quynh_An/Form_mau_anh_dai_dien_236_x_315.png",
        gender: "FEMALE",
        bg: "Trường THPT Gia Định, TP.HCM",
        description: "Ankipedia không phải lúc nào cũng đúng, nhưng sẵn sàng cập nhật, không phải là nguồn tài liệu cuối cùng mà sẽ là nguồn tài liệu đầu tiên của học sinh."
    },
]
const ListTeacherPage = () => {
    return (
        <LayoutClient>
            <Row gutter={[15, 15]}>
                {
                    data.map((it, index) => {
                        return (
                            <Col
                                xs={24} sm={12} md={8} lg={6}
                                key={index}
                            >
                                <div className='bg-[#fff] shadow-sm p-4 rounded-[4px] flex flex-col gap-4 border-[1px] border-[#d7d7d7] cursor-pointer h-full'
                                    onClick={() => { }}
                                >
                                    <div>
                                        <img src={it.img} alt="" className='w-full' />
                                    </div>
                                    <Tooltip
                                        title={it.name}
                                        color='#1e293bb3'
                                    >
                                        <div className='text-truncate text-[14px] text-[#2a70b8] font-semibold hover:text-[#c46f20] hover:underline transition duration-200'>
                                            {configGender(it.gender)}: {it.name}
                                        </div>
                                    </Tooltip>
                                    <p className='text-[14px] font-semibold'>{it.bg}</p>
                                    <p className='text-truncate-3 text-[14px]'>{it.description}</p>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </LayoutClient>
    )
}

export default ListTeacherPage