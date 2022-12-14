import {URL_BASE} from "../constants";
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {Col, Progress, Row} from 'reactstrap';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import './style.css';
import './ReportsContainer.scss';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';

import {Modal} from "react-bootstrap";

import IndicatorReport from "../components/Reports/IndicatorReport";
import AppFrame from "../components/AppFrame/AppFrame";


class ReportsCompanyMentorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            nombre_empresa_usuario: "",
            programas: [],
            programa_actual: {funcionarios: 0},
            programa_seleccionado: '',
            resumen: {},
            tipos_indicadores: [],
            tipo_indicador_seleccionado: "",
            indicador: {datos: []},
            indicadores: [],
            tipo_indicador: 0,
            numeroEmpleadosEmpresa: 0,

            es_visible_modal_carga: true,

        };

        const id_emprendedor = props.id;

        const id_user = `${URL_BASE}/empresa/empresa-del-emprendedor/${id_emprendedor}`;
        fetch(id_user, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                nombre_empresa_usuario: data.nombre_usuario,
                value: data.id
            });

            const idUser = `${URL_BASE}/programa/emprendedor-y-listado-programas/${id_emprendedor}`;
            var response = fetch(idUser, {
                headers: new Headers({
                    'Authorization': `Token ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json',
                }), method: 'GET',
            }).then(resolve => {
                return resolve.json();
            }).then(data => {
                let programas = data;
                let programa_seleccionado = programas[0].id;
                this.setState({
                    programas: programas,
                    programa_actual: programas[0],
                    programa_seleccionado: programa_seleccionado,
                });
                this.handleChangeProgram()
            }).catch(() => {
                this.setState({
                    es_visible_modal_carga: false,
                });
            });

        }).catch(() => {
            this.setState({
                es_visible_modal_carga: false,
            });
        });

        this.handleChangeProgram = this.handleChangeProgram.bind(this);
        this.handleChangeIndicator = this.handleChangeIndicator.bind(this);
    }

    handleChangeProgram(event) {
        if (event != undefined) {
            this.setState({programa_seleccionado: event.target.value});
        }
        const api_resume_entity = `${URL_BASE}/entidad/${event ? event.target.value : this.state.programa_seleccionado}/resumen/${this.state.value}`;
        fetch(api_resume_entity, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            let tipos_indicadores_para_seleccionar = data.tipos_indicadores
            let indicador_seleccionado = 0
            if (tipos_indicadores_para_seleccionar.length != 0) {
                indicador_seleccionado = data.tipos_indicadores[0].nombre
            }
            this.setState({
                resumen: data.resumen,
                tipos_indicadores: tipos_indicadores_para_seleccionar,
                tipo_indicador_seleccionado: indicador_seleccionado,
                es_visible_modal_carga: false,
            });
            this.handleChangeIndicator();
        }).catch(() => {
            this.setState({
                es_visible_modal_carga: false,
            });
        });
    }

    handleChangeIndicator(event) {

        if (event != undefined) {
            this.setState({tipo_indicador_seleccionado: event.target.value});
        }

        const api_indicator_entity = `${URL_BASE}/entidad/indicador/${this.state.value}/${this.state.programa_seleccionado}/${event ? event.target.value : this.state.tipo_indicador_seleccionado}`;
        fetch(api_indicator_entity, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                indicador: data,
            });
            this.llenarNumeroEmpleados()
        }).catch(function (re) {
            console.log(re)
        });
    }

    llenarNumeroEmpleados() {

        const api_indicator_entity = `${URL_BASE}/empresa/usuario/${this.state.value}`;
        fetch(api_indicator_entity, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                numeroEmpleadosEmpresa: data[0].n_empleados,
            });
        }).catch(function (re) {
            console.log(re)
        });
    }


    render() {
        return (
            <AppFrame>
                <div id="content-report">
                    <div className='container'>

                        <Modal show={this.state.es_visible_modal_carga} backdrop="static" keyboard={false} centered>
                            <Modal.Header>
                                <Modal.Title>Cargando informaci??n...</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col className="col-12 text-center">
                                        Actualizando informaci??n del reporte, por favor espere
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>

                        <Row>
                            <Col className="col-xs-12 text-center mb-4 bg-modified-title mt-5">
                                <h3>Tablero de control de la empresa {this.state.nombre_empresa_usuario}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-md-12 col-lg-3 text-center espacioPanels">
                                Seleccione el programa de inter??s
                                {
                                    <select className="form-control" value={this.state.programa_seleccionado}
                                            onChange={this.handleChangeProgram}>
                                        {
                                            this.state.programas.map(programa => (
                                                <option key={programa.id} value={programa.id}>{programa.nombre}</option>
                                            ))
                                        }
                                    </select>
                                }

                            </Col>
                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="cards-indicadores">
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <img src={require("../statics/clock.png")} height="50" id="hpi"></img>
                                            <h3>{this.state.resumen.horas_recibidas}</h3>
                                            <b className="mb-3 menor_tamano">HORAS <br/></b>
                                            <b className="mb-3 menor_tamano">RECIBIDAS</b>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="card border-0 bg-modified text-inverse" style={{backgroundColor: '#95C11F'}}>
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <img src={require("../statics/sand-clock.png")} height="50" id="hpi"></img>
                                            <h3>{this.state.resumen.porcentaje_asistencia}%</h3>
                                            <b className="mb-3 menor_tamano">PORCENTAJE <br/></b>
                                            <b className="mb-3 menor_tamano">ASISTENCIA</b>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="card border-0 bg-modified text-inverse" style={{backgroundColor: '#95C11F'}}>
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <img src={require("../statics/homework.png")} height="50" id="hpi"></img>
                                            <h3>{this.state.resumen.porcentaje_cumplimiento_tareas}%</h3>
                                            <b className="mb-3 menor_tamano"> CUMPLIMIENTO DE TAREAS</b>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            &nbsp;
                        </Row>
                        <Row>
                            <Col className="col-12 col-sm-6 col-md-3 text-center">
                                <div className="card border-0 bg-modified-2 text-inverse mb-3" id="sizeInfoDate" style={{backgroundColor: '#f4f2f2'}}>
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <b className="mb-3 menor_tamano" id="lineHeigthDate">FECHAS DEL
                                                PROGRAMA<br/> </b>
                                            <h6>
                                                <Moment
                                                    format="MMM DD YYYY">{moment.utc(this.state.programa_actual.fecha_inicio).locale('es')}</Moment>
                                                -
                                                <Moment
                                                    format="MMM DD YYYY">{moment.utc(this.state.programa_actual.fecha_fin).locale('es')}</Moment>
                                            </h6>
                                            <b className="mb-3 menor_tamano" id="lineHeigthDate">N??m de empleados: <br/></b>
                                            <h4>{this.state.numeroEmpleadosEmpresa}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            {this.state.tipos_indicadores.length > 0 ?
                                <Col className="col-12 col-sm-6 col-md-9 text-center">
                                    <div className="card border-0 bg-modified-star text-inverse" id="sizeInfostart">
                                        <div className="card-body">
                                            <div className="text-center">Porcentaje de avance total de los indicadores
                                                seleccionados: {this.state.resumen.porcentaje_estrella_norte}%
                                            </div>
                                            <Progress value={this.state.resumen.porcentaje_estrella_norte}
                                                      color="success"/>
                                        </div>
                                    </div>
                                </Col>
                                :
                                <Col className="col-12 col-sm-6 col-md-9 text-center">
                                    <div className="card border-0 bg-modified-star text-inverse" id="sizeInfostart">
                                        <div className="card-body">
                                            <h3>A??n no hay datos o indicadores para esta empresa
                                            </h3>
                                        </div>
                                    </div>
                                </Col>
                            }
                        </Row>
                        <Row>
                            &nbsp;
                        </Row>

                        {this.state.tipos_indicadores.length > 0 &&
                        <div>
                            <Row>
                                <Col className="col-12 col-md-12 col-lg-3">
                                    Seleccione el indicador de inter??s
                                    <select className="form-control mb-3" value={this.state.tipo_indicador_seleccionado}
                                            onChange={this.handleChangeIndicator}>
                                        {
                                            this.state.tipos_indicadores.map((indicador, index) => (
                                                <option key={index} value={indicador.nombre}>{indicador.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </Col>
                                <Col className="col-12 col-md-12 col-lg-9">
                                    <Row>
                                        <Col className="col-md-4">
                                            <div className="card border-0 bg-modified text-inverse" style={{backgroundColor: '#95C11F'}}>
                                                <div className="card-body">
                                                    <div className="text-grey">
                                                        <img src={require("../statics/success.png")} height="50"
                                                             id="hpi"></img>
                                                        <h3>{this.state.indicador.linea_base}</h3>
                                                        <b className="mb-3 menor_tamano">L??NEA BASE DEL INDICADOR</b>
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-4">
                                            <div className="card border-0 bg-modified text-inverse" style={{backgroundColor: '#95C11F'}}>
                                                <div className="card-body">
                                                    <div className="text-grey">
                                                        <img src={require("../statics/success.png")} height="50"
                                                             id="hpi"></img>
                                                        <h3>{this.state.indicador.meta}</h3>
                                                        <b className="mb-3 menor_tamano">META DEL INDICADOR</b>
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col className="col-md-4">
                                            <div className="card border-0 bg-modified text-inverse" style={{backgroundColor: '#95C11F'}}>
                                                <div className="card-body">
                                                    <div className="text-grey">
                                                        <img src={require("../statics/growth.png")} height="50"
                                                             id="hpi"></img>
                                                        <h3>{this.state.indicador.estado_actual}</h3>
                                                        <b className="mb-3 menor_tamano"> ESTADO ACTUAL</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row>
                                &nbsp;
                            </Row>

                            {this.state.indicador.data ?

                                <Row id="rowWhiteBackground">
                                    <Col className="col-md-12 bg-modified-graph">
                                        &nbsp;
                                    </Col>
                                    <Col className="col-md-12 bg-modified-graph">
                                        <div className="text-center">
                                            Porcentaje de avance: {this.state.indicador.porcentaje_avance}%
                                        </div>
                                        <Progress value={this.state.indicador.porcentaje_avance} color="success"/>
                                    </Col>
                                    <Col className="col-12 col-md-12 col-lg-10 text-center" id="colorGraphBackground">
                                        <IndicatorReport nombre_div="chartdiv2" nombre={this.state.indicador.nombre}
                                                         nametitleX={this.state.indicador.eje_x}
                                                         nametitleY={this.state.indicador.eje_y}
                                                         data={this.state.indicador.data}
                                                         valueGoal={this.state.indicador.meta}
                                                         baseLine={this.state.indicador.linea_base}
                                                         style={{width: "100%", height: "500px"}}/>
                                    </Col>

                                    <Col className="col-12 col-md-12 col-lg-2">
                                        <div className="card border-0 bg-modified-graph text-inverse mb-3"
                                             id="sizeInfoGraph">
                                            <div className="card-body">
                                                <div>
                                                    <b className="mb-3 menor_tamano">??ltima medici??n</b>
                                                    <h4>{this.state.indicador.estado_actual}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border-0 bg-modified-graph text-inverse mb-3"
                                             id="sizeInfoGraph">
                                            <div className="card-body">
                                                <div className="mb-3 text-grey">
                                                    <b className="mb-3 menor_tamano">Variaci??n respecto al periodo
                                                        pasado</b>
                                                    <h4>{this.state.indicador.variacion}%</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border-0 bg-modified-graph text-inverse mb-3"
                                             id="sizeInfoGraph">
                                            <div className="card-body">
                                                <div className="mb-3 text-grey">
                                                    <b className="mb-3 menor_tamano">Valor promedio</b>
                                                    <h4>{this.state.indicador.promedio}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                :
                                <Row id="rowWhiteBackground">
                                    <Col className="col-md-12 bg-modified-graph">
                                        <div className="card border-0 bg-modified-star text-inverse" id="sizeInfostart">
                                            <div className="card-body">
                                                <h3>Este indicador no tiene datos registrados</h3>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            <Row>
                                &nbsp;
                            </Row>
                        </div>
                        }
                    </div>
                </div>
            </AppFrame>
        );
    }
}

ReportsCompanyMentorContainer.propTypes = {
    id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps)(ReportsCompanyMentorContainer));
