import {URL_BASE} from "../constants";
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import {connect} from "react-redux";
import './style.css';
import './ReportsContainer.scss';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/es';

import IndicatorReport from "../components/Reports/IndicatorReport";
import IndicatorBarReport from "../components/Reports/IndicatorBarReport";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {Modal} from "react-bootstrap";
import {Button} from 'antd';

import {format} from "date-fns";
import DatePicker from "react-datepicker";
import {registerLocale, setDefaultLocale} from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import {toast} from "react-toastify";
import {getInformeEmprendedoresPorPrograma, getActsRequest} from "../api/indicadores";
import {getet,} from "../selectors/institutions";


registerLocale('es', es)
setDefaultLocale('es');

am4core.useTheme(am4themes_animated);

class ReportEntityPerProgramContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resumen: {fechas: {}, herramientas_dictadas: {}, horas_dictadas: {}, fundadores_capacitados: {}},
            programas: [],
            value: "",
            mentorias: [],
            valueAux: "",
            horas: 0,
            calificaciones_mentor: {puntajes_finales: []},
            sesiones: 0,
            spinner: true,

            es_visible_modal_exportacion: false,
            exportacion_fecha_inicial: null,
            exportacion_fecha_final: null,

            es_visible_modal_carga: true,
        };

        const api_entities = `${URL_BASE}/programa/entidad`;
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
                programas: data[0]['programa'],
                value: data[0]['programa'][0].id,
                sesiones: data[0]['programa'][0].n_sesiones,

            });
            this.handleChange();
        }).catch(() => {
            this.setState({
                es_visible_modal_carga: false,
            });
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMentoria = this.handleChangeMentoria.bind(this);

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

    handleChange(event) {
        if (event != undefined) {
            this.setState({value: event.target.value});
        }

        const api_resume_program = `${URL_BASE}/programa/resumen/${event ? event.target.value : this.state.value}`;
        fetch(api_resume_program, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                resumen: data,
                es_visible_modal_carga: false,
            });
            this.llenarMentorias()
        }).catch(() => {
            this.setState({
                es_visible_modal_carga: false,
            });
        });
    }

    handleChangeMentoria(event) {
        if (event != undefined) {
            this.setState({valueAux: event.target.value});
        }
        this.llenarHoras(event ? event.target.value : this.state.valueAux)
    }

    llenarHoras(id_mentor) {
        const api_mentoria_horas = `${URL_BASE}/programa/${this.state.value}/resumen/mentor/${id_mentor}`;
        fetch(api_mentoria_horas, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            this.setState({
                calificaciones_mentor: data,
            });
        }).catch(function (re) {
            console.log(re);
        });
    }

    llenarMentorias() {
        const api_mentorias = `${URL_BASE}/programa/mentores/${this.state.value}`;
        fetch(api_mentorias, {
            headers: new Headers({
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }),
            method: 'GET',
        }).then(resolve => {
            return resolve.json();
        }).then(data => {
            let mentorias_programa = data;
            let valueAuxMentorias = ""
            if (mentorias_programa.length != 0) {
                valueAuxMentorias = data[0].id
                this.llenarHoras(valueAuxMentorias)

            } else {
                this.state.calificaciones_mentor = []
                this.state.calificaciones_mentor.moda_calificacion = 0

            }
            this.setState({
                mentorias: mentorias_programa,
                valueAux: valueAuxMentorias,
                spinner: false,
            });

        }).catch(function (re) {
            console.log(re);
        });
    }

    componentWillUnmount() {
    }

    fetchReportes = () => {
        fetch(`${URL_BASE}/programa/descargar/reporte-programas/${this.state.value}/${format(this.state.exportacion_fecha_inicial, 'yyyy-MM-dd')}/${format(this.state.exportacion_fecha_final, 'yyyy-MM-dd')}`, {
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
                a.download = "reporte_por_programa.xlsx";
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

    handleInformeEmprendedores = async ()=> {
        const response = await getInformeEmprendedoresPorPrograma(this.state.value)
    }

    getActs = async ()=> {
        const response = await getActsRequest(this.state.value)
    }

    render() {
        return (
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
                                <Modal.Title>Exportación de datos del programa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col className="col-12 text-center">
                                        La exportación de toda la información relacionada al programa se hará una vez
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
                                {this.state.exportacion_fecha_inicial != null && this.state.exportacion_fecha_final != null &&
                                    <Button variant="primary" className='btn-verde-basico' onClick={this.fetchReportes}>
                                        Exportar
                                    </Button>
                                }
                                <Button variant="secondary" className='btn-danger-basico' danger type='primary' onClick={this.ocular_modal_exportacion}>
                                    Cerrar
                                </Button>
                               
                            </Modal.Footer>
                        </Modal>

                        <Row>
                            <Col className="col-xs-12 text-center mb-4 text-center mb-4 bg-modified-title">
                                <Button className='btn-verde-basico mr-2 mb-2'
                                        onClick={this.mostrar_modal_exportacion}>
                                    Descargar informe programa
                                </Button>
                                <Button className='btn-verde-basico mr-2 mb-2'
                                        onClick={this.handleInformeEmprendedores}>
                                    Descargar informe {this.props.et_plural.toLowerCase()}
                                </Button>
                                <Button className='btn-verde-basico'
                                        onClick={this.getActs}>
                                    Descargar actas
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-md-12 col-lg-3 text-center espacioPanels">
                                Seleccione el programa de interés
                                <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                                    {
                                        this.state.programas.map(programa => (
                                            <option key={programa.id} value={programa.id}>{programa.nombre}</option>
                                        ))

                                    }
                                </select>
                            </Col>

                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="card border-0 cards-indicadores">
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <img src={require("../statics/rating.png")} height="50" id="hpi" alt=''></img>
                                            <h3>{this.state.resumen.total_emprendedores}</h3>
                                            <b className="mb-3 menor_tamano">TOTAL DE</b>
                                            <b className="mb-3 menor_tamano"> FUNDADORES</b>
                                        </div>
                                    </div>

                                </div>

                            </Col>

                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="card border-0 mb-3 cards-indicadores">
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <img src={require("../statics/education.png")} height="50" id="hpi" alt=''></img>
                                            <h3>{this.state.resumen.total_mentores}</h3>
                                            <b className="mb-3 menor_tamano">TOTAL DE MENTORES</b>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col className="col-12 col-md-4 col-lg-3 espacioPanels">
                                <div className="card border-0 mb-3 cards-indicadores">
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <img src={require("../statics/clapping.png")} height="50" id="hpi" alt=''></img>
                                            <h3>{this.state.resumen.emprendedores_activos}</h3>
                                            <b className="mb-3 menor_tamano">FUNDADORES ACTIVOS</b>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <Row>
                            <Col className="col-lg-3 col-sm-6 col-md-12 col-xs-12 text-center">
                                {/* <div className="card border-0 mb-3 fechas-programa" id="sizeInfoDate" style={{backgroundColor: '#f4f2f2'}}>
                                    <div className="card-body">
                                        <div className="text-grey">
                                            <b className="mb-3 menor_tamano" id="lineHeigthDate">FECHAS DEL
                                                PROGRAMA </b>
                                            <h6>
                                                <Moment
                                                    format="MMM DD YYYY">{moment.utc(this.state.resumen.fechas.inicio).locale('es')}</Moment>
                                                -
                                                <Moment
                                                    format="MMM DD YYYY">{moment.utc(this.state.resumen.fechas.fin).locale('es')}</Moment>
                                            </h6>
                                        </div>
                                    </div>
                                </div> */}
                            </Col>

                            <Col className="col-lg-9 col-sm-12 col-md-12" xs='12'>
                                <Row>
                                    <Col className="col-12 col-md-1">
                                    </Col>
                                    <Col className="col-12 col-md-5">
                                        <div className="card border-0 mb-3 cards-indicadores">
                                            <div className="card-body">
                                                <div className="text-grey">
                                                    <img src={require("../statics/onboarding.png")} height="50"
                                                         id="hpi" alt=''></img>
                                                    <h3>{this.state.resumen.suma_empleados_totales_empresas}</h3>
                                                    <b className="mb-3 menor_tamano">NÚMERO TOTAL DE<br/></b>
                                                    <b className="mb-3 menor_tamano">EMPLEADOS</b>

                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col className="col-12 col-md-5">
                                        <div className="card border-0 mb-3 cards-indicadores">
                                            <div className="card-body">
                                                <div className="text-grey">
                                                    <img src={require("../statics/teamwork.png")} height="50"
                                                         id="hpi" alt=''></img>
                                                    <h3>{this.state.resumen.promedio_empleados_totales_empresas}</h3>
                                                    <b className="mb-3 menor_tamano">EMPLEADOS PROMEDIO POR FUNDADOR</b>
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

                        {this.state.resumen.herramientas_dictadas.total > 0 &&
                        <Row id="rowWhiteBackground">
                            <Col className="col-md-12 bg-modified-graph">
                                <h3>Eventos ejecutados por día</h3>
                            </Col>
                            <Col className="col-12 col-md-12 col-lg-10" id="colorGraphBackground">
                                <IndicatorReport nombre_div="chartdiv" nametitleX="Fecha"
                                                 nametitleY="Total de eventos ejecutados"
                                                 data={this.state.resumen.mentorias_dictadas_grafico}/>
                            </Col>
                            <Col className="col-12 col-md-12 col-lg-2">
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Total</b>
                                            <h3>{this.state.resumen.herramientas_dictadas ? this.state.resumen.herramientas_dictadas.total : 0}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Promedio</b>
                                            <h3>{this.state.resumen.herramientas_dictadas ? this.state.resumen.herramientas_dictadas.promedio : 0}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Última medición</b>
                                            <h3>{this.state.resumen.herramientas_dictadas ? this.state.resumen.herramientas_dictadas.ultima_medicion : 0}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        }


                        <Row>
                            &nbsp;
                        </Row>

                        {this.state.resumen.horas_dictadas.total > 0 &&
                        <Row id="rowWhiteBackground">
                            <Col className="col-md-12 bg-modified-graph">
                                <h3>Número de horas dictadas por día</h3>
                            </Col>
                            <Col className="col-12 col-md-12 col-lg-10" id="colorGraphBackground">
                                <IndicatorReport nombre_div="chartdiv2" nametitleX="Fecha" nametitleY="Número de horas"
                                                 data={this.state.resumen.horas_dictadas_grafico}
                                                 style={{width: "100%", height: "500px"}}/>
                            </Col>
                            <Col className="col-12 col-md-12 col-lg-2">
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Total</b>
                                            <h3>{this.state.resumen.horas_dictadas.total}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Promedio</b>
                                            <h3>{this.state.resumen.horas_dictadas.promedio}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Última medición</b>
                                            <h3>{this.state.resumen.horas_dictadas.ultima_medicion}</h3>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        }

                        <Row>
                            &nbsp;
                        </Row>

                        {this.state.resumen.fundadores_capacitados.total > 0 &&
                        <Row id="rowWhiteBackground">
                            <Col className="col-md-12 bg-modified-graph">
                                <h3>Fundadores capacitados</h3>
                            </Col>
                            <Col className="col-12 col-md-12 col-lg-10" id="colorGraphBackground">
                                <IndicatorReport nombre_div="chartdiv3" nametitleX="Fechas"
                                                 nametitleY="Número de fundadores"
                                                 data={this.state.resumen.emprendedores_capacitados_grafico}
                                                 style={{width: "100%", height: "500px"}}/>
                            </Col>
                            <Col className="col-12 col-md-12 col-lg-2">
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div style={{alignItems: "center"}}>
                                            <b className="mb-3 menor_tamano">Total</b>
                                            <h3>{this.state.resumen.fundadores_capacitados ? this.state.resumen.fundadores_capacitados.total : 0}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Promedio</b>
                                            <h3>{this.state.resumen.fundadores_capacitados ? this.state.resumen.fundadores_capacitados.promedio : 0}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card border-0 bg-modified-graph text-inverse mb-3" id="sizeInfoGraph">
                                    <div className="card-body">
                                        <div className="mb-3 text-grey">
                                            <b className="mb-3 menor_tamano">Última medición</b>
                                            <h3>{this.state.resumen.fundadores_capacitados ? this.state.resumen.fundadores_capacitados.ultima_medicion : 0}</h3>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                        }

                        <Row>
                            &nbsp;
                        </Row>

                        {this.state.resumen.herramientas_dictadas.total > 0 && this.state.resumen.horas_dictadas.total > 0 && this.state.resumen.fundadores_capacitados.total > 0
                            ? [
                                <Row>
                                    <Col className="col-12 col-md-12 col-lg-12 col-xl-3">
                                        Seleccione el mentor de interés
                                        <select className="form-control" value={this.state.valueAux}
                                                onChange={this.handleChangeMentoria}>
                                            {
                                                this.state.mentorias.map(mentoria => (
                                                    <option key={mentoria.id}
                                                            value={mentoria.id}>  {mentoria["first_name"]} {mentoria["last_name"]}</option>
                                                ))
                                            }
                                        </select>
                                    </Col>

                                    <Col className="col-12 col-md-12 col-lg-4 col-xl-3 espacioPanels">
                                        <div className="card border-0 cards-indicadores">
                                            <div className="card-body">
                                                <div className="text-grey">
                                                    <img src={require("../statics/clock1.png")} height="50"
                                                         id="hpi" alt=''></img>
                                                    <h3>{this.state.calificaciones_mentor.horas_dictadas}</h3>
                                                    <b className="mb-3 menor_tamano">TOTAL DE HORAS DICTADAS</b>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-md-12 col-lg-4 col-xl-3 espacioPanels">
                                        <div className="card border-0 cards-indicadores">
                                            <div className="card-body">
                                                <div className="text-grey">
                                                    <img src={require("../statics/rating1.png")} height="50"
                                                         id="hpi" alt=''></img>
                                                    <h3>{this.state.calificaciones_mentor.moda_calificacion}</h3>
                                                    <b className="mb-3 menor_tamano">MODA DE LA CALIFICACIÓN</b>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-md-12 col-lg-4 col-xl-3 espacioPanels">
                                        <div className="card border-0 cards-indicadores">
                                            <div className="card-body">
                                                <div className="text-grey">
                                                    <img src={require("../statics/medal1.png")} height="50"
                                                         id="hpi" alt=''></img>
                                                    {this.state.resumen.mejor_mentor == 0 ?
                                                        <h3>---</h3>
                                                        : <h4>{this.state.resumen.mejor_mentor}</h4>
                                                    }

                                                    <b className="mb-3 menor_tamano">MEJOR MENTOR DEL PROGRAMA</b>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>,

                                <Row>
                                    &nbsp;
                                </Row>,

                                (this.state.calificaciones_mentor.moda_calificacion > 0
                                        ?
                                        <Row id="rowWhiteBackground">
                                            <Col className="col-12 col-md-12 bg-modified-graph">
                                                <h3>Calificaciones del mentor seleccionado</h3>
                                                <h5>Promedio de calificaciones del
                                                    mentor: {this.state.calificaciones_mentor.promedio}</h5>
                                            </Col>
                                            <Col className="col-md-12" id="colorGraphBackground">
                                                <IndicatorBarReport nombre_div="chartdiv4"
                                                                    nametitleX="Calificación del mentor"
                                                                    nametitleY="Cantidad de emprendedores"
                                                                    data={this.state.calificaciones_mentor.puntajes_finales}
                                                                    style={{width: "100%", height: "500px"}}/>
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col className="col-12 col-md-12 bg-modified-graph">
                                                <div
                                                    className="card border-0 bg-modified-star text-inverse text-center">
                                                    <div className="card-body">
                                                        <div className="text-grey">
                                                            <h4>Aún no hay calificaciones para este mentor</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                )
                            ]
                            :
                            <Row>
                                <Col className="col-md-12 text-center">
                                    <div className="card border-0 bg-modified-star text-inverse" id="sizeInfostart">
                                        <div className="card-body">
                                            <h4>Aún no hay eventos para este programa</h4>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        }
                        <Row>
                            &nbsp;
                        </Row>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    et_plural: getet(state).replace('-', ''),
});

export default withRouter(connect(mapStateToProps, {})(ReportEntityPerProgramContainer));
