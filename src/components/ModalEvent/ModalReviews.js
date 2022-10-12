import React, { useState } from "react";
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button, Spin } from "antd";
import { URL_BASE } from "../../constants";
import { connect } from "react-redux";
import RatingMentor from "../RatingMentor/RatingMentor";
import { toast } from "react-toastify";
import getJsonStrError from "../../helpers/handleJsonErrors";
import { fetchEventsbyId } from "../../actions/fetchEvents";
import { Checkbox } from "antd";

const ModalReviews = (props) => {
  const {
    className,
    show,
    modal,
    toggle,
    username,
    marketplace,
    setEventMarket,
  } = props;

  const [review, setReview] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [goal_reached, setGoalReached] = useState(false);
  const [goal_reachedNo, setGoalReachedNo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [retire, setRetire] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let url = `${URL_BASE}/calendario/evento/calificar/${username}`;
    let bool = false;
    if (marketplace) {
      url = `${URL_BASE}/marketplace/calificar/evento/${username}`;
      bool = true;
    }
    if (!goal_reached && !goal_reachedNo) {
      toast.error(
        "Por favor marque si se cumplió o no el objetivo de la sesión"
      );
      return;
    }
    if (review === "") {
      toast.error("Por favor déjanos tus comentarios");
      return;
    }
    let request = await fetch(url, {
      headers: new Headers({
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
      method: "POST",
      body: JSON.stringify({
        puntaje: calificacion,
        comentario: review,
        goal_reached: goal_reached ? true : false,
        retire: retire,
      }),
    });

    const json = await request.json();
    if (request.status !== 201) {
      toast.error(getJsonStrError(json));
    } else {
      toast.success("Tu calificación ha sido enviada correctamente");
      setEventMarket(true);
      await props.fetchEventsbyId(username, bool);
      let reload = () => {
        toggle();
      };
      setTimeout(reload, 2000);
    }
    setLoading(false);
  };

  function onChangeSi(e) {
    setGoalReached(e.target.checked);
  }

  function onChangeNo(e) {
    setGoalReachedNo(e.target.checked);
  }

  return (
    <div>
      <Modal isOpen={modal} className={className} show={show} toggle={toggle}>
        <ModalHeader id="titulo-modales-blancos">
          <h5>
            <strong>Por favor califica tu sesión:</strong>
          </h5>
        </ModalHeader>
        <ModalBody>
          <RatingMentor calificacion={setCalificacion} />
          <div className="text-center" style={{ marginBottom: "2%" }}>
            <p>¿Se cumplió con el objetivo de la sesión?</p>
            <Checkbox onChange={onChangeSi}>Si</Checkbox>
            <Checkbox onChange={onChangeNo}>No</Checkbox>
          </div>

          <Input
            style={{ color: "black" }}
            id="text-area-reviews"
            type="textarea"
            placeholder="Por favor déjanos tus comentarios"
            rows={5}
            onChange={(obj) => {
              setReview(obj.target.value);
            }}
            className="mb-3"
          />
          {/* <div className="text-center" style={{ marginBottom: "2%" }}>
            <p style={{ marginBottom: 0 }}>¿Retiro?</p>
            <Checkbox onChange={(e) => setRetire(e.target.checked)}></Checkbox>
          </div> */}
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-verde-basico"
            onClick={handleSubmit}
            type="submit"
          >
            {loading ? <Spin size="small" /> : "Enviar"}
          </Button>{" "}
          <Button
            className="btn-danger-basico"
            type="primary"
            danger
            onClick={toggle}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchEventsbyId,
})(ModalReviews);
