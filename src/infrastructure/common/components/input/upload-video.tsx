import { Button, Upload, UploadProps, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

type Props = {
    label: string,
    attributeImg: any,
    setVideo: Function,
    setImageUrl: Function
}

function UploadVideo(props: Props) {
    const { label, attributeImg, setVideo, setImageUrl } = props;


    const propsVideo: UploadProps = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setVideo(info.file.originFileObj)
            }
            // if (info.file.status === 'done') {
            //     message.success(`${info.file.name} tải lên thành công`);
            // } else if (info.file.status === 'error') {
            //     message.error(`${info.file.name} tải lên không thành công`);
            // }
        },
    };
    useEffect(() => {
        setImageUrl(attributeImg)
    }, [attributeImg])

    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        {/* <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span> */}
                    </span>
                </div>
                <div>
                    <Upload {...propsVideo} >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </div>
            </div>
        </div>
    );
}

export default UploadVideo;
