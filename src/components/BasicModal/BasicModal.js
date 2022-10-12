import React from "react";
import { Modal } from "react-bootstrap";
import logo_grovity from "../../assets/images/logo-removebg-preview.png";
import "./BasicModal.scss";

export default function BasicModal(props) {
  const { show, setShow, children } = props;
  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      enforceFocus={false}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <img src={logo_grovity} alt="Grovity" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
