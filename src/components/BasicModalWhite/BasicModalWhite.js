import React, {useState, useEffect} from "react";
import {Modal} from "react-bootstrap";
import {Button} from 'antd'
import logo_grovity from "../../assets/images/logo-grovity-removebg-preview-white.png";
import FBD from '../../assets/images/logo-fbd/Logo-FBD_Color.png'
import "./BasicModalWhite.scss";

export default function BasicModalWhite(props) {
    const {show, setShow, children} = props;
    const [logo, setLogo] = useState(null);
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const tema = localStorage.getItem('theme')
        setTheme(tema)
        if (!theme) {
            setLogo(logo_grovity)
        } else if (theme === 'davivienda') {
            setLogo(FBD)
        }
    }, [logo, theme])
   

    const handleClose = () => {
        setShow(false);
    }
    return (
        <Modal
            className="basic-modal-white"
            show={show}
            onHide={() => setShow(false)}
            enforceFocus={false}
            centered
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <img src={logo} alt="Grovity"/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button className='btn-danger-basico' type='primary' danger onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

