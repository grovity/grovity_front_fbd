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

import IndicatorReport from "../components/Reports/IndicatorReport";
import {Modal} from "react-bootstrap";
import {Button} from "antd";

import {format} from "date-fns";
import DatePicker from "react-datepicker";
import {registerLocale, setDefaultLocale} from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";
import AppFrame from "../components/AppFrame/AppFrame";

registerLocale('es', es)
setDefaultLocale('es');

class ReportsEntrepreneurPerProgramContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id_entidad: 0,
            programas: [],
            programa_actual: {funcionarios: 0},
            programa_seleccionado: "",
            emprendimientos: [],
            value: "",
            resumen: {},
            tipos_indicadores: [],
            tipo_indicador_seleccionado: "",
            indicador: {},
            indicadores: [],
            tipo_indicador: 0,
            resources: 0,
            numeroEmpleadosEmpresa: 0,

            es_visible_modal_exportacion: false,
            exportacion_fecha_inicial: null,
            exportacion_fecha_final: null,

            es_visible_modal_carga: true,
            nombre_empresa: '',
            meta: '',
        };

        const idUser = `${URL_BASE}/entidad/entidad-y-listado-programas`;
        var response = fetch(idUser, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }), method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                let id_entidad = json.id_entidad;
                let programas = json.programas;
                let programa_seleccionado = programas[0].id;

                this.setState({
                    id_entidad: id_entidad,
                    programas: programas,
                    programa_actual: programas[0],
                    programa_seleccionado: programa_seleccionado,
                });

                this.handleChangeProgram();

                this.handleChangeProgram = this.handleChangeProgram.bind(this);
                this.handleChange = this.handleChange.bind(this);
                this.handleChangeIndicator = this.handleChangeIndicator.bind(this);

            }).catch(() => {
                this.setState({
                    es_visible_modal_carga: false,
                });
            });

        this.ocular_modal_exportacion = this.ocular_modal_exportacion.bind(this);
        this.mostrar_modal_exportacion = this.mostrar_modal_exportacion.bind(this);

        this.cambiar_fecha_inicio = this.cambiar_fecha_inicio.bind(this);
        this.cambiar_fecha_fin = this.cambiar_fecha_fin.bind(this);
    }

    ocular_modal_exportacion() {
        this.setState({
            es_visible_modal_exportacion: false,
        });
    }

    mostrar_modal_exportacion() {
        this.setState({
            es_visible_modal_exportacion: true,
        });
    }

    handleChangeProgram(event) {
        if (event != undefined) {
            this.setState({programa_seleccionado: event.target.value});
        }

        const api_entities = `${URL_BASE}/usuario/entidad/${this.state.id_entidad}/${event ? event.target.value : this.state.programa_seleccionado}`;
        fetch(api_entities, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                emprendimientos: data,
                value: data[0].id,
                es_visible_modal_carga: false,
            });
            this.handleChange();
        }).catch(() => {
            this.setState({
                es_visible_modal_carga: false,
            });
        });

    }

    handleChange(event) {
        if (event != undefined) {
            this.setState({value: event.target.value})
        }
        const api_resume_entity = `${URL_BASE}/entidad/${this.state.id_entidad}/resumen/${this.state.programa_seleccionado}/${event ? event.target.value : this.state.value}`;

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
            });
            this.handleChangeIndicator();
        }).catch(function (re) {
            console.log(re)
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
                numeroEmpleadosEmpresa: data && data[0].n_empleados,
                nombre_empresa: data && data[0].nombre,
                meta: data && data[0].meta,
            });
        }).catch(function (re) {
            console.log(re)
        });
    }


    fetchReportes = () => {
        fetch(`${URL_BASE}/programa/descargar/reporte-emprendedores/${this.state.programa_seleccionado}/${format(this.state.exportacion_fecha_inicial, 'yyyy-MM-dd')}/${format(this.state.exportacion_fecha_final, 'yyyy-MM-dd')}`, {
            method: 'GET',
            headers: new Headers({
                "Authorization": `Token ${localStorage.getItem("token")}`
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.blob()
                } else {
                    toast.error('Error al descargar el archivo')
                }

            })
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "reporte_emprendedores.xlsx";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
            });

    }

    cambiar_fecha_inicio(inicio) {
        this.setState({
            exportacion_fecha_inicial: inicio,
        });
    }

    cambiar_fecha_fin(fin) {
        this.setState({
            exportacion_fecha_final: fin,
        });
    }

    render() {
        // console.log(this.state.indicador)
        // console.log(this.state.indicador.data)
        let numeroIndicadores = this.state.tipo_indicador.length;
        let showLabels;
        let showGraph;

        return (
            // <AppFrame>
                <div id="content-report">
                    <div className='container'>

                        <Modal show={this.state.es_visible_modal_carga} backdrop="static" keyboard={false} centered>
                            <Modal.Header>
                                <Modal.Title>Cargando información...</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col className="col-12 text-center">
                                        Actualizando información del reporte, por favor espere
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={this.state.es_visible_modal_exportacion} onHide={this.ocular_modal_exportacion}>
                            <Modal.Header closeButton>
                                <Modal.Title>Exportación de datos de la empresa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col className="col-12 text-center">
                                        La exportación de toda la información relacionada a la empresa se hará una vez
                                        seleccione el periodo de tiempo de interés, a partir de una fecha de inicio
                                        y una fecha de finalización.
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <b>Fecha inicio</b><br/>
                                        <DatePicker
                                            selected={this.state.exportacion_fecha_inicial}
                                            onChange={date => this.cambiar_fecha_inicio(date)}
                                            selectsStart
                                            startDate={this.state.exportacion_fecha_inicial}
                                            endDate={this.state.exportacion_fecha_final}
                                            dateFormat="yyyy-MM-dd"
                                            locale="es"
                                        />
                                    </Col>
                                    <Col className="col-12 text-center">
                                        <b>Fecha finalización</b><br/>
                                        <DatePicker
                                            selected={this.state.exportacion_fecha_final}
                                            onChange={date => this.cambiar_fecha_fin(date)}
                                            selectsEnd
                                            startDate={this.state.exportacion_fecha_inicial}
                                            endDate={this.state.exportacion_fecha_final}
                                            minDate={this.state.exportacion_fecha_inicial}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.ocular_modal_exportacion}>
                                    Cerrar
                                </Button>
                                {this.state.exportacion_fecha_inicial != null && this.state.exportacion_fecha_final != null &&
                                <Button variant="primary" onClick={this.fetchReportes}>
                                    Exportar
                                </Button>
                                }
                            </Modal.Footer>
                        </Modal>


                        <Row>
                            <Col className="col-xs-12 text-center text-center mb-4 bg-modified-title mt-5">
                                {/* <h3>Tablero de control de las empresas</h3> */}
                                <Button className='btn-verde-basico'
                                        onClick={this.mostrar_modal_exportacion}>
                                    Descargar informe
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-md-12 col-lg-3 text-center">
                                Seleccione el programa de interés
                                <select className="form-control" value={this.state.programa_seleccionado}
                                        onChange={this.handleChangeProgram}>
                                    {
                                        this.state.programas.map(programa => (
                                            <option key={programa.id}
                                                    value={programa.id}>{programa.nombre}</option>
                                        ))
                                    }
                                </select>
                                Seleccione el fundador de interés
                                <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                                    {
                                        this.state.emprendimientos.map(emprendimiento => (
                                            <option key={emprendimiento.id} value={emprendimiento.id}>

                                                {(emprendimiento.first_name.length > 0 || emprendimiento.last_name.length > 0) ?
                                                    `${emprendimiento.first_name} ${emprendimiento.last_name}`
                                                    :
                                                    emprendimiento.email
                                                }
                                            </option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="card border-0 cards-indicadores">
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
                                <div className="card border-0 cards-indicadores">
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
                                <div className="card border-0 cards-indicadores">
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

                        <Row id={'nombre-empresa-report'}>
                                <Col>
                                    <h4 style={{color: 'black'}}>Empresa {this.state.nombre_empresa}</h4>
                                </Col>
                            </Row>

                        <Row>
                            <Col className="col-12 col-sm-6 col-md-3 text-center">
                                <div className="card border-0 mb-3 fechas-programa" id="sizeInfoDate">
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <b className="mb-3 menor_tamano" id="lineHeigthDate">FECHAS DEL
                                                PROGRAMA<br/>
                                            </b>
                                            <h6>
                                                <Moment
                                                    format="MMM DD YYYY">{moment.utc(this.state.programa_actual ? this.state.programa_actual.fecha_inicio : 0).locale('es')}</Moment>
                                                -
                                                <Moment
                                                    format="MMM DD YYYY">{moment.utc(this.state.programa_actual ? this.state.programa_actual.fecha_fin : 0).locale('es')}</Moment>
                                            </h6>

                                            <b className="mb-3 menor_tamano" id="lineHeigthDate">Núm de empleados: <br/></b>

                                            <h4>{this.state.numeroEmpleadosEmpresa}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            {this.state.tipos_indicadores.length > 0 ?
                                <Col className="col-12 col-sm-6 col-md-9 text-center">
                                    <div className="card border-0 bg-modified-star text-inverse" id="sizeInfostart">
                                        <div className="card-body">
                                            <div className="text-center">Porcentaje de avance para el cumplimiento total
                                                de
                                                los indicadores
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
                                            <h4>El usuario no tiene empresa registrada o aún no hay indicadores para esta empresa
                                            </h4>
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
                                    Seleccione el indicador de interés
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
                                        <Col className="col-md-4 col-sm-12 col-12">
                                            <div className="card border-0 cards-indicadores" style={{minHeight: '125px'}}>
                                                <div className="card-body">
                                                    <div className="text-grey">
                                                        <img src={require("../statics/success.png")} height="50"
                                                             id="hpi"></img>
                                                        <h3>{this.state.indicador.linea_base}</h3>
                                                        <b className="mb-3 menor_tamano">LÍNEA BASE DEL INDICADOR</b>
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col className="col-md-4 col-sm-12 col-12" >
                                            <div className="card border-0 cards-indicadores" style={{minHeight: '125px'}}>
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

                                        <Col className="col-md-4 col-sm-12 col-12">
                                            <div className="card border-0 cards-indicadores" style={{minHeight: '125px'}}>
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
                                        <IndicatorReport nombre_div="chartdiv5" nombre={this.state.indicador.nombre}
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
                                                    <b className="mb-3 menor_tamano">Última medición</b>
                                                    <h3>{this.state.indicador.estado_actual}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border-0 bg-modified-graph text-inverse mb-3"
                                             id="sizeInfoGraph">
                                            <div className="card-body">
                                                <div className="mb-3 text-grey">
                                                    <b className="mb-3 menor_tamano">Variación respecto al periodo
                                                        pasado</b>
                                                    <h3>{this.state.indicador.variacion}%</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border-0 bg-modified-graph text-inverse mb-3"
                                             id="sizeInfoGraph">
                                            <div className="card-body">
                                                <div className="mb-3 text-grey">
                                                    <b className="mb-3 menor_tamano">Valor promedio</b>
                                                    <h3>{this.state.indicador.promedio}</h3>
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
            // </AppFrame>
        )
    }
}

ReportsEntrepreneurPerProgramContainer.propTypes = {
    emprendimientos: PropTypes.array.isRequired,
};

ReportsEntrepreneurPerProgramContainer.defaultProps = {
    emprendimientos: []
};

const mapStateToProps = state => ({});

export default withRouter(connect(mapStateToProps, {})(ReportsEntrepreneurPerProgramContainer));