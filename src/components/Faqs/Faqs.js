import React from 'react';
import PropTypes from 'prop-types';
import './Faqs.scss'
import {Row, Col, Collapse} from 'antd';

const { Panel } = Collapse;

function callback(key) {
    // console.log(key);
  } 

class Faqs extends React.PureComponent {

    static propTypes = {
        className: PropTypes.string,
        isMobile: PropTypes.bool,
    }
    static defaultProps = {
        className: 'faqs',
    }

    render() {
        const {isMobile} = this.props;
        return (
            <div className='fondo-faqs'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='faqsContainer'>
                    <Col lg={18} md={16} className="containerFaqs">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="secondary-row">
                            <h3>Preguntas Frecuentes</h3>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col xs={20} sm={20} md={24} lg={24}>
                                <Collapse defaultActiveKey={['1']} ghost accordion onChange={callback} className="main-collapse">
                                    <Panel header="Mentores" key="1">
                                        <Row>
                                            <Col xs={20} sm={20} md={24} lg={24} className='secondary-collapse-faqs'> 
                                                <Collapse accordion>
                                                    <Panel header="¿Cómo hacer seguimiento a los indicadores de cada empresa?" key="1">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo ver el perfil del emprendedor? " key="2">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo ver y editar mi perfil? " key="3">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Dónde y cómo puedo compartir archivos con los emprendedores? " key="4">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿El emprendedor recibe notificaciones de los archivos que he subido? " key="5">
                                                    <p>No, actualmente se está trabajando en esta funcionalidad.</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo confirmo una mentoría?  " key="6">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo subo el acta de la reunión a la plataforma?" key="7">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo eliminar un archivo subido en el perfil de un emprendedor 
                                                                    (Cometí un error al subir el archivo)? " key="8">
                                                    <p>En este momento esta opción no está disponible, pero se está trabajando 
                                                        para habilitarla en una o dos semanas.</p>
                                                    </Panel>
                                                    <Panel header="¿Hay alguna opción para subir varios archivos al mismo tiempo y 
                                                                elegir a qué emprendedor se le carga en su perfil?  " key="9">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo puedo subir una carpeta con varios archivos? En ocasiones 
                                                                cuando lo hago de la manera convencional se queda cargando la plataforma." key="10">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="El emprendedor no se presentó a la mentoría pero la mentoría queda 
                                                                    pendiente por confirmar, ¿como puedo cambiar esto para que quede 
                                                                    confirmada y no como una mentoría pendiente?  " key="11">
                                                    <p>En este caso la mentoría queda pendiente debido a que ninguno de los participantes 
                                                        se presentó por lo cual no se puede confirmar. Esto es necesario debido a que se 
                                                        paga a los mentores por mentorías confirmadas. <br/> Para confirmar la mentoría así 
                                                        no se haya realizado, es necesario enviar un correo electrónico con la información 
                                                        al coordinador del proyecto.</p>
                                                    </Panel>
                                                </Collapse>
                                            </Col>
                                        </Row>
                                    </Panel>

                                    <Panel header="Emprendedores - Empresarios" key="2">
                                        <Row>
                                            <Col xs={20} sm={20} md={24} lg={24} className='secondary-collapse-faqs'>
                                                
                                                <Collapse accordion>
                                                    <Panel header="¿Cómo creo el perfil de mi empresa?" key="1">
                                                    <p>En</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo ingreso la línea base y la meta de mis indicadores? " key="2">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo ver la gráfica de mis indicadores? " key="3">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo agregar un dato a la gráfica? " key="4">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo editar un dato de la gráfica? " key="5">
                                                    <p>hola</p>
                                                    </Panel>
                                                    <Panel header="Si me he equivocado en el registro de indicadores, ¿puedo editarlos?" key="6">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo ver el perfil del mentor?" key="7">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo ver y editar mi perfil?" key="8">
                                                    <p>hola</p>
                                                    </Panel>
                                                    <Panel header="¿Dónde y cómo puedo compartir archivos con mi mentor?" key="9">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Dónde veo los archivos adjuntos que mi mentor ha subido?" key="10">
                                                    <p>Hola</p>
                                                    </Panel>
                                                    <Panel header="¿Mi mentor recibe notificaciones de los archivos que he subido?" key="11">
                                                    <p>hola</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo calificar a mi mentor?" key="11">
                                                    <p>hola</p>
                                                    </Panel>
                                                </Collapse>
                                            </Col>
                                        </Row>
                                    </Panel>

                                    <Panel header="Entidades" key="3">
                                        <Row>
                                            <Col xs={20} sm={20} md={24} lg={24} className='secondary-collapse-faqs'>
                                                <Collapse accordion>
                                                    <Panel header="¿Qué dimensiones debe tener la foto de perfil del programa?" key="1">
                                                    <p>No hay dimensiones específicas. 
                                                        <br/> Se recomienda que la foto sea cuadrada, de lo contrario Grovity realizará un
                                                        recorte automático de la foto para que quede se ajuste.</p>
                                                    </Panel>
                                                    <Panel header="¿Cómo puedo ver que un mentor confirmó una mentoría? " key="2">
                                                    <p>Si las mentorías tienen actas, en el perfil de Signaturit puedes ver las 
                                                        actas enviadas con el nombre de la sesión. <br/> Si las mentorías no tienen actas
                                                        puedes descargar el informe del programa dando clic en el botón "Reportes", desde
                                                        el panel de control, luego clic en el botón "Tablero de control de programa" y luego
                                                        clic en el botón "Descargar informe". Allí puedes ver las sesiones que han sido 
                                                        confirmadas por el mentor.
                                                    </p>
                                                    </Panel>
                                                    <Panel header="¿Cómo puedo ver que un emprendedor calificó a un mentor? " key="3">
                                                    <p>Hola</p>
                                                    </Panel>
                                                </Collapse>
                                            </Col>
                                        </Row>
                                    </Panel>

                                    <Panel header="General" key="4">
                                        <Row>
                                            <Col xs={20} sm={20} md={24} lg={24} className='secondary-collapse-faqs'>
                                                <Collapse accordion>
                                                    <Panel header="¿Cómo puedo cambiar mi contraseña?" key="1">
                                                    <p>No</p>
                                                    </Panel>
                                                    <Panel header="¿Tengo problemas con mi computador, puedo conectarme desde mi iPad o mi celular?" key="2">
                                                    <p>Si, puedes acceder a Grovity desde tu celular o iPad.</p>
                                                    </Panel>
                                                </Collapse>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                            </Col>
                        </Row>                        
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Faqs;