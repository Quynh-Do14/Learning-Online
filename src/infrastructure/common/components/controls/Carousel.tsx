import { Carousel } from 'antd'

const CarouselCommon = () => {
    return (
        <div className='h-full'>
            <Carousel>
                <img src={"https://hocmai.vn/media/images/home/desktop/46banner-webphuongpa-715x400-1.png"} className='w-full rounded-[4px]' />
                <img src={"https://hocmai.vn/media/images/home/desktop/pat-hust-plus715x400-2.png"} className='w-full rounded-[4px]' />
            </Carousel>
        </div>
    )
}

export default CarouselCommon