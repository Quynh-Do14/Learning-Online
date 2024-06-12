import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import Constants from '../../../../core/common/constants';
type Props = {
    listLesson: Array<any>
}
const LessonCourse = (props: Props) => {
    const { listLesson } = props;
    const navigate = useNavigate();

    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.DETAIL_LESSON).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[16px] text-[#ffffff] font-semibold bg-[#0d9e6d] p-2'>Bài giảng</div>
            {
                listLesson && listLesson.length
                    ?
                    listLesson.map((it, index) => {
                        return (
                            <div
                                key={index}
                                className='border-b-[1px] border-b-[#d4d4d4] pb-2 flex flex-col gap-2'
                            >
                                <div
                                    onClick={() => onNavigate(it.id)}
                                    className='text-[16px] text-[#1e293bb3] font-semibold bg-[#f1f1f1] px-2 py-1 cursor-pointer'
                                >
                                    {it.name}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: it.description }} />
                            </div>
                        )
                    })
                    :
                    <div className='text-[16px] font-semibold text-[#1e293be3] text-center py-2'>
                        Chưa có bài giảng !!!
                    </div>
            }
        </div>
    )
}

export default LessonCourse