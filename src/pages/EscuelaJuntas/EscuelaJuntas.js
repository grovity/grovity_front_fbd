import React, {Component} from "react";
import NavBarEscuelaJuntas from "../../components/NavBarEscuelaJuntas/NavBarEscuelaJuntas";
import {enquireScreen} from 'enquire-js';
import BannerEscuelaJuntas from "../../components/BannerEscuelaJuntas/BannerEscuelaJuntas";
import DescripcionEscuelaJuntas from "../../components/DescripcionEscuelaJuntas/DescripcionEscuelaJuntas";
import ObjetivosEscuelaJuntas from "../../components/ObjetivosEscuelaJuntas/ObjetivosEscuelaJuntas";
import AprenderaEscuela from "../../components/AprenderaEscuela/AprenderaEscuela";
import ContadorEscuelaJuntas from "../../components/ContadorEscuelaJuntas/ContadorEscuelaJuntas";
import EscuelaTrainers from "../../components/EscuelaTrainers/EscuelaTrainers";
import CallToActionEscuela from "../../components/CallToActionEscuela/CallToActionEscuela";
import FooterEscuelaJuntas from "../../components/FooterEscuelaJuntas/FooterEscuelaJuntas";
import ConJuntasPodra from "../../components/ConJuntasPodra/ConJuntasPodra";

let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});


class LandingEscuelaJuntas extends Component {
    state = {
        isMobile,
        showShadow: false,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
    }

    navToShadow = (e) => {
        this.setState({showShadow: e.mode === 'leave'});
    }

    render() {
        return (
            <React.Fragment>
                <NavBarEscuelaJuntas key="header" className={this.state.showShadow ? 'show-shadow' : ''}></NavBarEscuelaJuntas>
                <BannerEscuelaJuntas
                    msg="Fórmese como miembro de Junta directiva y ayude a las empresas a tomar mejores decisiones"
                    submsg="Escuela de Juntas Directivas"
                    key="banner"
                    isMobile={this.state.isMobile}
                    navToShadow={this.navToShadow}/>
                <DescripcionEscuelaJuntas descripcion1='“Un programa único en Latam por su práctica e innovadora 
                                                    metodología aplicada en empresas del sector real”'
                >
                </DescripcionEscuelaJuntas>
                <ObjetivosEscuelaJuntas objetivos='Formar miembros de Juntas Directivas que puedan ayudar a las 
                                                    empresas a tomar decisiones estratégicas'
                                        dirigido="Ejecutivos, empresarios o profesionales interesados en la 
                                                    formación de competencias como miembro de Junta, que no cuentan
                                                     con experiencia previa en este tipo de órganos"
                                        metodologia="Se realizarán ocho (8) sesiones virtuales de tres (3) horas cada
                                                     una, los días viernes y sábado. Durante tres (3) meses, los participantes 
                                                     harán parte de una Junta Asesora que pondremos a su disposición, y así poner 
                                                     en práctica las habilidades adquiridas"
                                        key="objetivos-escuela" isMobile={this.state.isMobile}>
                </ObjetivosEscuelaJuntas>
                <ConJuntasPodra podra1="Formarse en “ soft skills ” y “hard skills ” requeridas en los órganos de dirección"
                                podra2="Familiarizarse con el amplio mundo del Gobierno Corporativo" 
                                podra3="Generar un networking en el medio de Juntas Directivas"
                                podra4="Certificarse como miembro independiente y/o consejero empresarial" 
                                key="con-juntas-podra" isMobile={this.state.isMobile}/>
                <AprenderaEscuela aprendera1='Relación entre la JD, la Gestión con la Asamblea'
                                aprendera2='Tamaño, conformación, diseño y funcionamiento de la Junta '
                                aprendera3='Decisiones críticas'
                                aprendera4='Virtualización del Gobierno Corporativo'
                                aprendera5='Soft Skills'
                                aprendera6='Orientación estratégica'
                                aprendera7='El rol de los miembros independientes'
                                aprendera8='Presentación de informes a la junta directiva'
                                aprendera9='La participación del Gerente y otros ejecutivos'
                                aprendera10='El rol de las mujeres en las Juntas'
                                aprendera11='Effective Meetings'
                                aprendera12='Manejo de conflictos de interés'
                                />

                <ContadorEscuelaJuntas inicio="Iniciamos el 30 de Julio"
                                    preventa="Aproveche el precio de preventa hasta el 11 de Julio:"
                                    preventaPrecio="$3.843.700 COP"
                                    // preventaPrecio="$3.230.000 COP + IVA"
                                    inscripcion="La preventa acaba en:"
                                    segundaFecha="Después $4.500.000 COP"
                                    terceraFecha="Del 26 al 30 de Septiembre $4.200.000 COP + IVA"/>

                <EscuelaTrainers key="escuela-trainers" isMobile={this.state.isMobile}/>
                <CallToActionEscuela cupos="Cupos Limitados"
                                    accede="Acceda YA al programa y fórmese como miembro de Junta Directiva"
                                    boton="PAGUE AQUÍ Y RESERVE SU CUPO"/>
                <FooterEscuelaJuntas key="footer-escuela" isMobile={this.state.isMobile}/>
            </React.Fragment>

        );
    }
}

export default LandingEscuelaJuntas;