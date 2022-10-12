import React, {useState} from "react";
import {Popconfirm, Button} from 'antd';

const PopConfirm = (props) => {
    const {functionDelete, id, type, message, setFlag} = props
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        const res = await functionDelete(id)
        if (setFlag) {
            setFlag(true)
        }
        if (res) {
            setVisible(false)
            if (!setFlag) {
                let reload = () => {
                    window.location.reload()
                }
                setTimeout(reload, 2000)
            }
        }
         setVisible(false)
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Popconfirm
                title={`¿Está seguro que desea eliminar esta ${message}?`}
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{loading: confirmLoading}}
                onCancel={handleCancel}
                cancelText={'Cancelar'}
            >
                <Button className='btn-danger-basico' danger block type={type ? type : ''} onClick={showPopconfirm}>
                    Eliminar
                </Button>
            </Popconfirm>
        </>
    );
};

export default PopConfirm